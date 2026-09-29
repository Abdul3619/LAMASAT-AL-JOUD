// Amāra Beauty Lounge is a demo brand. No phone or WhatsApp number is set, so WhatsApp links open with the message
// ready and let the visitor choose the chat. Add a real client's number (digits only, international format) here.
export const SITE = {
  name: 'Amāra Beauty Lounge',
  nameAr: 'أمارا بيوتي لاونج',
  whatsappNumber: '',
};

export function whatsappLink(text: string) {
  const base = SITE.whatsappNumber ? `https://wa.me/${SITE.whatsappNumber}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}
