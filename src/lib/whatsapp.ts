// WhatsApp number in international format, digits only (no +, spaces or dashes).
export const WHATSAPP_NUMBER = "919824444496";

/** wa.me link with a prefilled quote request; includes the product name when given. */
export function whatsappQuoteUrl(productName?: string) {
  const text = productName
    ? `Hello Recreation, I would like to request a quote for ${productName}.`
    : "Hello Recreation, I would like to request a quote.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
