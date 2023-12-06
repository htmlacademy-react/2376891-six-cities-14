import { ChangeEvent, FormEvent, useCallback } from 'react';
import { Rating } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useFormData } from '../../hooks/use-form-data';
import RatingItem from '../rating-item/rating-item';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { addNewReviewAction } from '../../store/api-actions';
import { getOffer, getNewReviewPostingStatus, getOffersChangedStatus } from '../../store/data-process/selectors';
import { setNewReviewPostedStatus } from '../../store/data-process/data-process';

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getOffer);
  const isNewReviewPosted = useAppSelector(getNewReviewPostingStatus);
  const isOfferChangedStatus = useAppSelector(getOffersChangedStatus);
  const ratings = Object.entries(Rating).reverse();

  const [formData, handleFormDataChange] = useFormData();

  const isFormDataValid = formData.rating > 0 && formData.comment.length >= 50 && formData.comment.length <= 300;

  const resetForm = () => {
    if (isNewReviewPosted && isFormDataValid) {
      handleFormDataChange('', 0);
      dispatch(setNewReviewPostedStatus(false));
    }
  };

  if (isNewReviewPosted) {
    resetForm();
  }

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    handleFormDataChange(null, Number(evt.target.value));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    handleFormDataChange(evt.target.value, null);
  };

  const handleReviewSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    if (currentOffer) {
      evt.preventDefault();
      dispatch(addNewReviewAction([currentOffer.id, formData]));
    }
  }, [dispatch, formData.rating, formData.comment, isFormDataValid, currentOffer]);

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleReviewSubmit} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(([score, title]) => (
          <RatingItem
            key={score}
            score={score}
            title={title}
            formData={formData.rating}
            isFormDisabled={isOfferChangedStatus}
            onRatingChangeHandle={handleRatingChange}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        onChange={handleReviewChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        disabled={isOfferChangedStatus}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit" disabled={!isFormDataValid || isOfferChangedStatus}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
