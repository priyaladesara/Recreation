"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Move3d } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/*
 * Interactive 3D distribution transformer, built procedurally (no model download).
 * Model space: plinth top at y = 0.12, tank 2.0 × 1.6 × 1.2 sitting on skid rails.
 * Performance: initialised only once the browser is idle and the hero is on screen; shaders are
 * compiled asynchronously before the first frame (no main-thread freeze); lights only, no
 * environment map; instanced fins/sheds; pixel ratio capped; render loop paused when off screen
 * or the tab is hidden.
 */

const TANK = { w: 2.0, h: 1.6, d: 1.2, y0: 0.24 };
const TOP = TANK.y0 + TANK.h; // 1.84
const CAM_AZIMUTH = Math.atan2(5.2, 6.2); // camera direction around Y, from +Z towards +X

type Hotspot = {
  id: string;
  label: string;
  desc: string;
  pos: [number, number, number]; // model space
  normal: [number, number, number]; // outward direction, for facing test
  facing: number; // azimuth (rad) of the side that should face the camera when selected
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "hv",
    label: "HV bushings",
    desc: "Porcelain bushings bring the incoming 11 kV supply safely through the tank cover.",
    pos: [0, TOP + 0.78, -0.2],
    normal: [0, 1, 0],
    facing: 0.3,
  },
  {
    id: "conservator",
    label: "Conservator tank",
    desc: "Holds expansion oil so the main tank stays full as the oil heats and cools under load.",
    pos: [0.55, TOP + 0.98, -0.45],
    normal: [0, 0.6, -0.8],
    facing: -0.5,
  },
  {
    id: "radiator",
    label: "Radiator banks",
    desc: "Pressed-steel fins dissipate heat by natural oil circulation (ONAN cooling).",
    pos: [TANK.w / 2 + 0.42, TANK.y0 + 0.8, 0.25],
    normal: [1, 0, 0],
    facing: Math.PI / 2,
  },
  {
    id: "oltc",
    label: "Tap changer",
    desc: "Adjusts the winding ratio to hold the output voltage steady as supply conditions change.",
    pos: [0.6, TANK.y0 + 0.75, TANK.d / 2 + 0.26],
    normal: [0, 0, 1],
    facing: 0.25,
  },
  {
    id: "lv",
    label: "LV bushings",
    desc: "Low-voltage terminals deliver the stepped-down 433 V supply to your switchboard.",
    pos: [-0.45, TOP + 0.36, 0.38],
    normal: [0, 0.7, 0.7],
    facing: -0.2,
  },
];

function radialTexture(inner: string, outer: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function nameplateTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#c9ced4";
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = "#5a636e";
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, 492, 236);
  ctx.fillStyle = "#1b222b";
  ctx.font = "bold 54px sans-serif";
  ctx.fillText("RECREATION", 34, 82);
  ctx.font = "26px monospace";
  ctx.fillText("DISTRIBUTION TRANSFORMER", 34, 132);
  ctx.fillText("11 kV / 433 V · 50 Hz", 34, 172);
  ctx.fillText("ONAN · Dyn11", 34, 212);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const cableVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// Pulses travel along the cable towards the transformer (uv.x = 0 at the terminal).
const cableFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uPulse;
varying vec2 vUv;
void main() {
  float p = fract(vUv.x * 5.0 + uTime * 0.9);
  float glow = smoothstep(0.0, 0.08, p) * smoothstep(0.32, 0.08, p);
  gl_FragColor = vec4(mix(uBase, uPulse, glow), 1.0);
}`;

export default function TransformerViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const hotspotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const control = useRef({ target: null as number | null, holdUntil: 0 });
  const [selected, setSelected] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;

    // Builds the scene and returns its cleanup.
    const init = (): (() => void) => {

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        const id = requestAnimationFrame(() => setFailed(true));
        return () => cancelAnimationFrame(id);
      }

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 768;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.touchAction = "pan-y"; // vertical swipes still scroll the page
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x07090c, 10, 18);

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(5.2, 2.6, 6.2);
      camera.lookAt(0, 0.1, 0);

      // Lights: warm key + brand-coloured rims.
      scene.add(new THREE.HemisphereLight(0xb8c8d8, 0x0b0e13, 0.9));
      const fill = new THREE.DirectionalLight(0xdfe8f2, 0.9);
      fill.position.set(-4, 2.5, 6);
      scene.add(fill);
      const key = new THREE.DirectionalLight(0xfff3e0, 2.6);
      key.position.set(4, 6, 5);
      scene.add(key);
      const rimBlue = new THREE.DirectionalLight(0x2ea8f0, 1.8);
      rimBlue.position.set(-5, 3, -4);
      scene.add(rimBlue);
      const rimLime = new THREE.DirectionalLight(0x8cc63f, 1.3);
      rimLime.position.set(5, 2, -3);
      scene.add(rimLime);

      const root = new THREE.Group();
      root.position.y = -1.05;
      scene.add(root);

      const seg = small ? 20 : 32;
      const tankMat = new THREE.MeshStandardMaterial({ color: 0x4a5462, metalness: 0.3, roughness: 0.5 });
      const finMat = new THREE.MeshStandardMaterial({ color: 0x56616f, metalness: 0.3, roughness: 0.5 });
      const darkMat = new THREE.MeshStandardMaterial({ color: 0x2a323c, metalness: 0.25, roughness: 0.6 });
      const porcelainMat = new THREE.MeshStandardMaterial({ color: 0x7b4a2e, metalness: 0, roughness: 0.28 });
      const lvMat = new THREE.MeshStandardMaterial({ color: 0x9aa4ae, metalness: 0, roughness: 0.35 });
      const copperMat = new THREE.MeshStandardMaterial({
        color: 0xc27a43,
        metalness: 0.5,
        roughness: 0.35,
        emissive: 0x8cc63f,
        emissiveIntensity: 0.3,
      });
      const concreteMat = new THREE.MeshStandardMaterial({ color: 0x161b21, metalness: 0, roughness: 0.95 });

      const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(x, y, z);
        root.add(m);
        return m;
      };
      const cyl = (r: number, h: number, mat: THREE.Material, x: number, y: number, z: number, axis: "x" | "y" | "z" = "y") => {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
        m.position.set(x, y, z);
        if (axis === "x") m.rotation.z = Math.PI / 2;
        if (axis === "z") m.rotation.x = Math.PI / 2;
        root.add(m);
        return m;
      };

      // Plinth, glow ring and soft contact shadow.
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.2, 0.12, 64), concreteMat);
      plinth.position.y = 0.06;
      root.add(plinth);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, 0.008, 6, 128),
        new THREE.MeshBasicMaterial({ color: 0x8cc63f, transparent: true, opacity: 0.55 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.121;
      root.add(ring);
      const shadowTex = radialTexture("rgba(0,0,0,0.75)", "rgba(0,0,0,0)");
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(4.6, 3.6),
        new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.122;
      root.add(shadow);

      // Skid rails, tank, cover.
      box(TANK.w + 0.3, 0.12, 0.16, darkMat, 0, 0.18, 0.42);
      box(TANK.w + 0.3, 0.12, 0.16, darkMat, 0, 0.18, -0.42);
      box(TANK.w, TANK.h, TANK.d, tankMat, 0, TANK.y0 + TANK.h / 2, 0);
      box(TANK.w + 0.12, 0.06, TANK.d + 0.12, darkMat, 0, TOP + 0.03, 0);
      // Stiffener ribs on the long faces.
      [-0.6, 0, 0.6].forEach((x) => {
        box(0.05, TANK.h - 0.1, 0.04, tankMat, x, TANK.y0 + TANK.h / 2, TANK.d / 2 + 0.02);
        box(0.05, TANK.h - 0.1, 0.04, tankMat, x, TANK.y0 + TANK.h / 2, -TANK.d / 2 - 0.02);
      });

      // Radiator banks (instanced fins) + headers, both short sides.
      const finsPerSide = 13;
      const fins = new THREE.InstancedMesh(new THREE.BoxGeometry(0.44, 1.2, 0.022), finMat, finsPerSide * 2);
      const m4 = new THREE.Matrix4();
      let n = 0;
      for (const side of [-1, 1]) {
        for (let i = 0; i < finsPerSide; i++) {
          const z = -0.48 + (i * 0.96) / (finsPerSide - 1);
          m4.makeTranslation(side * (TANK.w / 2 + 0.3), TANK.y0 + 0.8, z);
          fins.setMatrixAt(n++, m4);
        }
        for (const y of [TANK.y0 + 0.24, TANK.y0 + 1.36]) {
          cyl(0.035, 1.02, darkMat, side * (TANK.w / 2 + 0.3), y, 0, "z");
          cyl(0.03, 0.12, darkMat, side * (TANK.w / 2 + 0.05), y, 0, "x");
        }
      }
      root.add(fins);

      // HV bushings: porcelain sheds (instanced), core, live copper terminal.
      const hvX = [-0.6, 0, 0.6];
      const shedsPer = 7;
      const hvSheds = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.11, 0.11, 0.032, seg), porcelainMat, hvX.length * shedsPer);
      n = 0;
      const terminals: THREE.Vector3[] = [];
      hvX.forEach((x) => {
        cyl(0.13, 0.06, darkMat, x, TOP + 0.09, -0.2);
        cyl(0.055, 0.62, porcelainMat, x, TOP + 0.43, -0.2);
        for (let i = 0; i < shedsPer; i++) {
          m4.makeTranslation(x, TOP + 0.18 + i * 0.075, -0.2);
          hvSheds.setMatrixAt(n++, m4);
        }
        cyl(0.06, 0.07, copperMat, x, TOP + 0.78, -0.2);
        terminals.push(new THREE.Vector3(x, TOP + 0.8, -0.2));
      });
      root.add(hvSheds);

      // LV bushings.
      const lvX = [-0.66, -0.22, 0.22, 0.66];
      const lvSheds = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.07, 0.07, 0.026, seg), lvMat, lvX.length * 3);
      n = 0;
      lvX.forEach((x) => {
        cyl(0.04, 0.3, lvMat, x, TOP + 0.2, 0.38);
        for (let i = 0; i < 3; i++) {
          m4.makeTranslation(x, TOP + 0.12 + i * 0.07, 0.38);
          lvSheds.setMatrixAt(n++, m4);
        }
        cyl(0.045, 0.05, copperMat, x, TOP + 0.37, 0.38);
      });
      root.add(lvSheds);

      // Conservator on brackets, with pipe to the cover.
      cyl(0.22, 1.5, tankMat, 0.2, TOP + 0.75, -0.45, "x");
      for (const x of [-0.4, 0.8]) box(0.06, 0.55, 0.06, darkMat, x, TOP + 0.3, -0.45);
      cyl(0.03, 0.5, darkMat, 0.55, TOP + 0.3, -0.3);

      // On-load tap changer cabinet + nameplate on the front face.
      box(0.46, 0.72, 0.24, tankMat, 0.6, TANK.y0 + 0.75, TANK.d / 2 + 0.13);
      box(0.4, 0.66, 0.01, darkMat, 0.6, TANK.y0 + 0.75, TANK.d / 2 + 0.255);
      const plateTex = nameplateTexture();
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.28), new THREE.MeshStandardMaterial({ map: plateTex, metalness: 0.2, roughness: 0.5 }));
      plate.position.set(-0.4, TANK.y0 + 1.05, TANK.d / 2 + 0.042);
      root.add(plate);

      // Incoming HV cables with current pulses, fading into the fog.
      const cableMat = new THREE.ShaderMaterial({
        vertexShader: cableVertex,
        fragmentShader: cableFragment,
        uniforms: {
          uTime: { value: 0 },
          uBase: { value: new THREE.Color(0x1b222b) },
          uPulse: { value: new THREE.Color(0x8cc63f) },
        },
      });
      terminals.forEach((t, i) => {
        const curve = new THREE.CatmullRomCurve3([
          t.clone(),
          t.clone().add(new THREE.Vector3(0, 0.35, 0)),
          new THREE.Vector3(t.x * 1.6 - 0.4, 3.4, -1.6 - i * 0.15),
          new THREE.Vector3(t.x * 2.4 - 1.2, 5.2, -3.6),
        ]);
        root.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.02, 8, false), cableMat));
      });

      // ---- Interaction ----
      let angle = CAM_AZIMUTH - 0.55;
      let dragging = false;
      let lastX = 0;
      const tilt = { x: 0, tx: 0 };
      const canvas = renderer.domElement;
      const onDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = "grabbing";
      };
      const onMove = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        tilt.tx = ((e.clientY - r.top) / r.height - 0.5) * 0.12;
        if (!dragging) return;
        angle += (e.clientX - lastX) * 0.008;
        lastX = e.clientX;
        control.current.target = null;
        control.current.holdUntil = performance.now() + 5000;
      };
      const onUp = (e: PointerEvent) => {
        dragging = false;
        if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
        canvas.style.cursor = "grab";
      };
      canvas.style.cursor = "grab";
      canvas.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);

      // ---- Layout ----
      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        camera.aspect = w / h;
        const dist = (w / h < 1 ? 1 / Math.max(w / h, 0.62) : 1) * 1.12;
        camera.position.set(5.2 * dist, 2.6 * dist, 6.2 * dist);
        camera.lookAt(0, 0.1, 0);
        camera.updateProjectionMatrix();
      };

      // ---- Hotspot projection (DOM buttons follow their 3D anchor) ----
      const tmp = new THREE.Vector3();
      const nrm = new THREE.Vector3();
      const toCam = new THREE.Vector3();
      const placeHotspots = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        HOTSPOTS.forEach((hs, i) => {
          const el = hotspotRefs.current[i];
          if (!el) return;
          tmp.set(...hs.pos);
          root.localToWorld(tmp);
          nrm.set(...hs.normal).applyQuaternion(root.quaternion);
          toCam.copy(camera.position).sub(tmp).normalize();
          const facing = nrm.dot(toCam) > -0.15;
          tmp.project(camera);
          el.style.transform = `translate3d(${(tmp.x * 0.5 + 0.5) * w}px, ${(-tmp.y * 0.5 + 0.5) * h}px, 0)`;
          el.style.opacity = facing ? "1" : "0.25";
          el.style.visibility = "visible"; // hidden until the scene has positioned it
        });
      };

      const timer = new THREE.Timer();
      timer.connect(document);
      let elapsed = 0;

      const render = (dt: number) => {
        elapsed += dt;
        const c = control.current;
        if (c.target !== null) {
          const diff = Math.atan2(Math.sin(c.target - angle), Math.cos(c.target - angle));
          angle += diff * Math.min(1, dt * 4);
        } else if (!dragging && performance.now() > c.holdUntil && !reduce) {
          angle += dt * 0.18;
        }
        if (c.target !== null && performance.now() > c.holdUntil) c.target = null;

        tilt.x += (tilt.tx - tilt.x) * 0.05;
        root.rotation.set(tilt.x, angle, 0);

        cableMat.uniforms.uTime.value = elapsed;
        copperMat.emissiveIntensity = 0.25 + Math.sin(elapsed * 3) * 0.15;
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(elapsed * 1.5) * 0.15;

        renderer.render(scene, camera);
        placeHotspots();
      };

      let visible = true;
      let ready = false;
      const sync = () => {
        const run = ready && visible && !document.hidden && !reduce;
        renderer.setAnimationLoop(
          run
            ? (t: number) => {
                timer.update(t);
                render(Math.min(timer.getDelta(), 0.05));
              }
            : null
        );
      };

      resize();
      canvas.style.opacity = "0";
      canvas.style.transition = "opacity 0.8s ease-out";
      // compileAsync uses KHR_parallel_shader_compile where available, so compiling the
      // materials doesn't block the main thread the way a first synchronous render does.
      renderer
        .compileAsync(scene, camera)
        .catch(() => undefined)
        .then(() => {
          if (disposed) return;
          ready = true;
          render(0);
          canvas.style.opacity = "1";
          mount.querySelector<HTMLElement>("[data-placeholder]")?.style.setProperty("opacity", "0");
          sync();
        });
      const ro = new ResizeObserver(() => {
        resize();
        if (ready) render(0);
      });
      ro.observe(mount);
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      io.observe(mount);
      document.addEventListener("visibilitychange", sync);
      // Reduced motion: still render on interaction, but never animate on its own.
      const onReducedInteract = () => reduce && ready && requestAnimationFrame(() => render(0.016));
      window.addEventListener("pointermove", onReducedInteract, { passive: true });
      const onSelect = () => {
        if (!reduce) return;
        const target = control.current.target;
        if (target !== null) angle = target;
        if (ready) render(0);
      };
      mount.addEventListener("transformer:select", onSelect);
      sync();

      return () => {
        renderer.setAnimationLoop(null);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", sync);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointermove", onReducedInteract);
        mount.removeEventListener("transformer:select", onSelect);
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointercancel", onUp);
        timer.dispose();
        scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
          mats.forEach((m) => m.dispose());
        });
        [shadowTex, plateTex].forEach((t) => t.dispose());
        renderer.dispose();
        canvas.remove();
      };
    };

    // Defer the heavy work (shader compile + first GPU frame) until the page has loaded, the hero
    // entrance animation has finished (~1.2s) and the browser is idle — so it never competes with
    // first paint, hydration or the intro motion. Until then a placeholder holds the space.
    let cleanup: (() => void) | null = null;
    let idleId = 0;
    let delayId = 0;
    const SETTLE_MS = 1200;
    const hasIdle = "requestIdleCallback" in window; // not in Safari
    const ric = (cb: () => void) => (hasIdle ? window.requestIdleCallback(cb, { timeout: 1500 }) : window.setTimeout(cb, 300));
    const cic = (id: number) => (hasIdle ? window.cancelIdleCallback(id) : window.clearTimeout(id));
    const start = () => {
      delayId = window.setTimeout(() => {
        idleId = ric(() => {
          if (!disposed) cleanup = init();
        });
      }, SETTLE_MS);
    };
    const onLoad = () => {
      const gate = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        gate.disconnect();
        start();
      });
      gate.observe(mount);
      stopGate = () => gate.disconnect();
    };
    let stopGate = () => {};
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener("load", onLoad);
      stopGate();
      window.clearTimeout(delayId);
      cic(idleId);
      cleanup?.();
    };
  }, []);

  // `now` is the click event's timeStamp (same clock as performance.now()).
  const onSelect = (i: number, now: number) => {
    setSelected((cur) => (cur === i ? null : i));
    control.current.target = CAM_AZIMUTH - HOTSPOTS[i].facing;
    control.current.holdUntil = now + 9000;
    mountRef.current?.dispatchEvent(new Event("transformer:select"));
  };

  const active = selected !== null ? HOTSPOTS[selected] : null;

  return (
    <div className="relative">
      <div ref={mountRef} className="relative aspect-square w-full sm:aspect-[5/4] lg:aspect-square">
        <div
          data-placeholder
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700"
        >
          <div className="h-2/3 w-2/3 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(46,168,240,0.12),transparent_65%)]" />
        </div>
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center text-center text-sm text-muted">
            3D view isn&apos;t supported on this device.
          </div>
        )}

        {/* HUD labels */}
        <div className="font-mono-hud pointer-events-none absolute left-0 top-0 text-[10px] uppercase tracking-[0.2em] text-muted">
          <span className="text-green">3D</span> · Distribution transformer
          <div className="mt-1 text-foreground/80">11 kV / 433 V</div>
        </div>
        <div className="font-mono-hud pointer-events-none absolute right-0 top-0 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted sm:flex">
          <Move3d className="h-3.5 w-3.5" aria-hidden />
          Drag to rotate
        </div>

        {/* Hotspots positioned by the render loop */}
        {!failed &&
          HOTSPOTS.map((hs, i) => (
            <button
              key={hs.id}
              ref={(el) => {
                hotspotRefs.current[i] = el;
              }}
              type="button"
              onClick={(e) => onSelect(i, e.timeStamp)}
              aria-pressed={selected === i}
              aria-label={`Show ${hs.label}`}
              className="group absolute left-0 top-0 -ml-[22px] -mt-[22px] flex h-11 w-11 cursor-pointer items-center justify-center transition-opacity duration-300"
              style={{ transform: "translate3d(-100px,-100px,0)", visibility: "hidden" }}
            >
              <span className="absolute h-3 w-3 rounded-full bg-green/60 animate-[ping-soft_2s_ease-out_infinite]" aria-hidden />
              <span
                className={`relative h-3 w-3 rounded-full border-2 border-background transition-transform ${
                  selected === i ? "scale-125 bg-amber" : "bg-green group-hover:scale-125"
                }`}
                aria-hidden
              />
              <span className="font-mono-hud pointer-events-none absolute left-9 top-1/2 hidden -translate-y-1/2 whitespace-nowrap bg-surface-2/95 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-foreground group-hover:block group-focus-visible:block lg:block">
                {hs.label}
              </span>
            </button>
          ))}
      </div>

      {/* Part chips: the tap-friendly / keyboard way to explore */}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Transformer parts">
        {HOTSPOTS.map((hs, i) => (
          <button
            key={hs.id}
            type="button"
            onClick={(e) => onSelect(i, e.timeStamp)}
            aria-pressed={selected === i}
            className={`chamfer chamfer-sm min-h-11 cursor-pointer px-3.5 text-xs font-medium transition-colors ${
              selected === i ? "bg-green text-background" : "bg-surface-2 text-muted hover:bg-border hover:text-foreground"
            }`}
          >
            {hs.label}
          </button>
        ))}
      </div>

      <div className="mt-3 min-h-[92px]" aria-live="polite">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="chamfer bg-surface-2 p-4"
            >
              <p className="font-display text-base font-semibold text-foreground">{active.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{active.desc}</p>
              <Link href="/products/transformer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-green hover:underline">
                View transformers
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="chamfer bg-surface-2/60 p-4 text-sm text-muted"
            >
              Select a part above, or tap a glowing point on the model, to see what it does.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
