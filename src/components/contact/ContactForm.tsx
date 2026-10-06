"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Panel from "@/components/ui/Panel";
import { products } from "@/lib/products";

const inputClass =
  "w-full min-h-12 border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted focus:border-green";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <Panel innerClassName="p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <CheckCircle2 className="h-12 w-12 text-green" aria-hidden />
            <h3 className="font-display mt-4 text-xl font-semibold text-foreground">Message sent</h3>
            <p className="mt-2 max-w-sm text-muted">
              Thank you for reaching out. One of our engineers will get back to you within one business day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" required />
              <Field label="Company" name="company" autoComplete="organization" />
              <Field label="Email" name="email" type="email" autoComplete="email" required />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            </div>

            <div>
              <label htmlFor="cf-product" className="mb-2 block text-sm font-medium text-foreground">
                Product interest
              </label>
              <select id="cf-product" name="product" className={`${inputClass} cursor-pointer`}>
                {products.map((p) => (
                  <option key={p.slug}>{p.name}</option>
                ))}
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-foreground">
                Message <span className="text-green">*</span>
              </label>
              <textarea
                id="cf-message"
                name="message"
                required
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about your requirement…"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary chamfer group w-full disabled:opacity-60 sm:w-auto">
              {loading ? "Sending…" : "Send message"}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </Panel>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `cf-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-green"> *</span>}
      </label>
      <input id={id} type={type} name={name} required={required} autoComplete={autoComplete} className={inputClass} />
    </div>
  );
}
