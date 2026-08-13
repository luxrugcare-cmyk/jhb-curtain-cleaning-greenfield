export function whatsappLink(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "27750119200";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
