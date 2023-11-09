function addPluralEnding(count: number) {
  return count !== 1 ? 's' : '';
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function getRatingWidth(rating: number) {
  return `${Math.abs(rating / 5) * 100}%`;
}

export { addPluralEnding, capitalize, getRatingWidth };
