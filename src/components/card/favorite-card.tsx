import { TOffer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useState, MouseEvent } from 'react';
import { addOfferFavoriteStatus } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

type TFavoriteCardProps = {
  offer: TOffer;
};

function FavoriteCard({ offer }: TFavoriteCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { price, isPremium, previewImage, title, type, id, isFavorite } = offer;
  const [isOfferFavorite, setOfferFavoriteStatus] = useState<boolean>(isFavorite);

  const handleFavoriteClick = (evt: MouseEvent<HTMLOrSVGElement>) => {
    evt.preventDefault();
    dispatch(addOfferFavoriteStatus({
      id: id,
      favoriteStatus: Number(!isOfferFavorite),
    }));
    setOfferFavoriteStatus(!isOfferFavorite);
  };

  return (
    <article className="favorites__card place-card" >
      <div className="place-card__mark">
        <span>{isPremium ? 'Premium' : ''}</span>
      </div>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt={title} />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`${isOfferFavorite ? 'place-card__bookmark-button--active' : ''} place-card__bookmark-button button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19" onClick={handleFavoriteClick}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '100%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to="#">{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
