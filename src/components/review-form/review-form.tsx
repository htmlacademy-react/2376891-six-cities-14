import { useState, ChangeEvent, FormEvent } from 'react';
import { Rating } from '../../const';
import { addNewReviewAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useFormData } from '../../hooks/use-form-data';
import RatingItem from '../rating-item/rating-item';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { getOffer, getNewReviewPostingStatus } from '../../store/data-process/selectors';

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(getOffer);
  const isNewReviewPosted = useAppSelector(getNewReviewPostingStatus);

  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const [formData, handleFormDataChange] = useFormData();

  const isFormDataValid = formData.rating > 0 && formData.comment.length >= 50 && formData.comment.length <= 300;

  const resetForm = () => {
    if (isNewReviewPosted && isFormDataValid) {
      handleFormDataChange('', 0);
    }
  };

  if (isNewReviewPosted) {
    resetForm();
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    handleFormDataChange(null, Number(evt.target.value));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    handleFormDataChange(evt.target.value, null);
  };

  const handleReviewSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsFormDisabled(true);
    dispatch(addNewReviewAction([currentOffer.id, formData]));
    setIsFormDisabled(false);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleReviewSubmit} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(Rating).reverse().map(([score, title]) => (
          <RatingItem key={score} score={score} title={title} formData={formData} isFormDisabled={isFormDisabled} onRatingChangeHandle={handleRatingChange} />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        onChange={handleReviewChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        disabled={isFormDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit" disabled={!isFormDataValid || isFormDisabled}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
