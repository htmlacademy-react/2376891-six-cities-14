import ReviewCard from '../card/review-card';
import ReviewForm from '../review-form/review-form';
import { useAppSelector } from '../../hooks';
import { MAX_REVIEWS_COUNT } from '../../const';
import { AuthorizationStatus } from '../../const';

function ReviewsList() {
  const reviews = useAppSelector((state) => state.reviews);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const reviewsToRender = reviews.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_REVIEWS_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviewsToRender.map((review) => (<ReviewCard review={review} key={review.id} />))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm /> }
    </section>
  );
}

export default ReviewsList;
