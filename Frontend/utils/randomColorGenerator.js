export const colors = [
  '#CCCC00', // darker yellow
  '#00008B', // dark blue (darkblue)
  '#8B0000', // dark red
  '#006400', // dark green
  '#CC8400'  // darker orange
];

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
