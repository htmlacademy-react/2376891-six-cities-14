import { useState, ChangeEvent, FormEvent } from 'react';
import { Rating } from '../../const';
import { Fragment } from 'react';
import { addNewReviewAction, fetchReviewsAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector((state) => state.offer);
  const isNewReviewPosted = useAppSelector((state) => state.isNewReviewPosted);

  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    comment: '',
    rating: 0,
  });

  const isFormDataValid = formData.rating > 0 && formData.comment.length >= 50 && formData.comment.length <= 300;

  const resetForm = () => {
    if (isNewReviewPosted && isFormDataValid) {
      setFormData({ ...formData, comment: '', rating: 0 });
    }
  };

  if (isNewReviewPosted) {
    resetForm();
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rating: Number(evt.target.value) });
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, comment: evt.target.value });
  };

  const handleReviewSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsFormDisabled(true);
    dispatch(addNewReviewAction([currentOffer.id, formData]));
    setIsFormDisabled(false);
    dispatch(fetchReviewsAction(currentOffer.id));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleReviewSubmit} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(Rating).reverse().map(([score, title]) => (
          <Fragment key={score}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={score}
              id={`${score}-stars`}
              type="radio"
              onChange={handleRatingChange}
              checked={score === String(formData.rating)}
              disabled={isFormDisabled}
            />
            <label htmlFor={`${score}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
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
