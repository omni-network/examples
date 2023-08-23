export const formatHex = (hex?: string) => {
  if (!hex) return '';
  const first = hex.slice(0, 5);
  const last = hex.slice(-5);
  return `${first}...${last}`;
}
