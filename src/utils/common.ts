import { TOffer } from '../types/offer';

function addPluralEnding(count: number) {
  return count !== 1 ? 's' : '';
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function getRatingWidth(rating: number) {
  return `${Math.abs(rating / 5) * 100}%`;
}

function getOffersByCity(offers: TOffer[], city: string | null): TOffer[] {
  return offers.filter((offer) => offer.city.name === city);
}

export { addPluralEnding, capitalize, getRatingWidth, getOffersByCity };
