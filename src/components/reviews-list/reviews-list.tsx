import ReviewCard from '../card/review-card';
import ReviewForm from '../review-form/review-form';
import { useAppSelector } from '../../hooks';
import { MAX_REVIEWS_COUNT, AuthorizationStatus } from '../../const';
import { getReviews } from '../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function ReviewsList() {
  const reviews = useAppSelector(getReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

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
