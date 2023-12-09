import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOffer, TOffers } from '../../types/offer';
import { OFFER_IMAGES_COUNT, AuthorizationStatus, AppRoute } from '../../const';
import { getRatingWidth, capitalize, addPluralEnding } from '../../utils/common';
import { useAppSelector, useAppDispatch } from '../../hooks';
import ReviewsList from '../reviews-list/reviews-list';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFavorites, getOffers } from '../../store/data-process/selectors';
import { changeOfferFavoriteStatus } from '../../store/api-actions';
import { setOfferChangedStatus } from '../../store/data-process/data-process';

type TOfferDetailsProps = {
  offer: TOffer;
}

function OfferDetails({ offer }: TOfferDetailsProps): JSX.Element {
  const { id, title, images, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description } = offer;
  const { name, avatarUrl, isPro } = host;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoritesOffers = useAppSelector(getFavorites);
  const offers = useAppSelector(getOffers);
  const [isOfferFavorite, setOfferFavoriteStatus] = useState<boolean>(isFavorite);

  const handleFavoriteClick = (evt: MouseEvent<HTMLOrSVGElement>) => {
    evt.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      let newOffers: TOffers = structuredClone(offers);
      let newFavoritesOffers: TOffers = structuredClone(favoritesOffers);

      if (isOfferFavorite) {
        newFavoritesOffers = favoritesOffers.filter((favoritesOffer) => favoritesOffer.id !== offer.id);
      } else {
        const newOffer: TOffer = structuredClone(offer);
        newOffer.isFavorite = !isOfferFavorite;
        newFavoritesOffers.push(newOffer);
      }

      newOffers = newOffers.reduce((newArr: TOffers, offersItem) => {
        if (offersItem.id !== id) {
          newArr.push(offersItem);
        } else {
          offersItem.isFavorite = !isFavorite;
          newArr.push(offersItem);
        }
        return newArr;
      }, []);

      dispatch(changeOfferFavoriteStatus({
        id: id,
        favoriteStatus: Number(!isOfferFavorite),
        newData: {
          newFavoritesOffers: newFavoritesOffers,
          newOffers: newOffers,
        }
      }));
      setOfferFavoriteStatus(!isOfferFavorite);
      dispatch(setOfferChangedStatus(true));
    }
  };

  return (
    <>
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {images.slice(0, OFFER_IMAGES_COUNT).map((image) => (
            <div className="offer__image-wrapper" key={image}>
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {title}
            </h1>
            <button
              className={`offer__bookmark-button button ${isOfferFavorite ? 'offer__bookmark-button--active' : ''}`}
              type="button"
            >
              <svg className="offer__bookmark-icon" width="31" height="33" onClick={handleFavoriteClick}>
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{width: getRatingWidth(rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {capitalize(type)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {bedrooms} Bedroom{addPluralEnding(bedrooms)}
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {maxAdults} adult{addPluralEnding(maxAdults)}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {goods.length > 0 && goods.map((good) => (
                <li className="offer__inside-item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className={`offer__avatar-wrapper user__avatar-wrapper ${isPro && 'offer__avatar-wrapper--pro'}`}>
                <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
              </div>
              <span className="offer__user-name">
                {name}
              </span>
              {isPro && <span className="offer__user-status">Pro</span>}
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {description}
              </p>
            </div>
          </div>
          <ReviewsList />
        </div>
      </div>
    </>
  );
}

export default OfferDetails;
