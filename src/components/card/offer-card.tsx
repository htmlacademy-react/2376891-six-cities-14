import { TOffer } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link, useNavigate } from 'react-router-dom';
import { capitalize } from '../../utils/common';
import { getRatingWidth } from '../../utils/common';
import { addOfferFavoriteStatus } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MouseEvent, useState } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type TOfferProps = {
  offer: TOffer;
  onCardMouseEnter?: () => void;
  onCardMouseLeave?: () => void;
  block: string;
};

function OfferCard({ offer, onCardMouseEnter, onCardMouseLeave, block }: TOfferProps): JSX.Element {
  const { price, isPremium, type, id, previewImage, title, rating, isFavorite } = offer;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOfferFavorite, setOfferFavoriteStatus] = useState<boolean>(isFavorite);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleFavoriteClick = (evt: MouseEvent<HTMLOrSVGElement>) => {
    evt.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    } else {
      dispatch(addOfferFavoriteStatus({
        id: id,
        favoriteStatus: Number(!isOfferFavorite),
      }));
      setOfferFavoriteStatus(!isOfferFavorite);
    }
  };

  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={block !== 'near-places' ? onCardMouseEnter : undefined}
      onMouseLeave={block !== 'near-places' ? onCardMouseLeave : undefined}
    >
      {isPremium ?
        (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        ) : ''}
      <div className={`${block}__image-wrapper place-card__image-wrapper`} >
        <Link to='#'>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`${isOfferFavorite ? 'place-card__bookmark-button--active' : ''} place-card__bookmark-button button`} type="button" >
            <svg className="place-card__bookmark-icon" width="18" height="19" onClick={handleFavoriteClick} >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingWidth(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
