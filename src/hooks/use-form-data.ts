import { useState } from 'react';
import { TFormData } from '../types/reviews-form-data';

type TResultFormData = [TFormData, (comment: string | null, rating: number | null) => void];

export const useFormData = (): TResultFormData => {
  const [formData, setFormData] = useState({
    comment: '',
    rating: 0,
  });

  const handleFormDataChange = (comment: string | null, rating: number | null) => {
    const newFormData = { ...formData };
    if (comment !== null) {
      newFormData.comment = comment;
    }
    if (rating !== null) {
      newFormData.rating = rating;
    }

    setFormData(newFormData);
  };

  return [formData, handleFormDataChange];
};
