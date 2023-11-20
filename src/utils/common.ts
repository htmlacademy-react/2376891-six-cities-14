import { TOffer, TOffers } from '../types/offer';

function addPluralEnding(count: number) {
  return count !== 1 ? 's' : '';
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function getRatingWidth(rating: number) {
  return `${Math.abs(rating / 5) * 100}%`;
}

function getOffersByCity(offers: TOffers, city: string | null): TOffers {
  return offers.filter((offer) => offer.city.name === city);
}

function sortOffersToHigh(offerA: TOffer, offerB: TOffer): number {
  return offerA.price - offerB.price;
}

function sortOffersToLow(offerA: TOffer, offerB: TOffer): number {
  return offerB.price - offerA.price;
}

function sortOffersByRating(offerA: TOffer, offerB: TOffer): number {
  return offerB.rating - offerA.rating;
}

export { addPluralEnding, capitalize, getRatingWidth, getOffersByCity, sortOffersToHigh, sortOffersToLow, sortOffersByRating };
