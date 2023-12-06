import { Fragment, memo, ChangeEvent } from 'react';
import { TFormData } from '../../types/reviews-form-data';

type TRatingItem = {
  score: string;
  title: string;
  formData: TFormData['rating'];
  isFormDisabled: boolean;
  onRatingChangeHandle: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function RatingItem({ score, title, formData, isFormDisabled, onRatingChangeHandle }: TRatingItem): JSX.Element {
  return (
    <Fragment>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={score}
        id={`${score}-stars`}
        type="radio"
        onChange={onRatingChangeHandle}
        checked={score === String(formData)}
        disabled={isFormDisabled}
      />
      <label htmlFor={`${score}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </Fragment>
  );
}

export default memo(RatingItem);
