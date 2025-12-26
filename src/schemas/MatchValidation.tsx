import * as yup from 'yup';

export const matchValidation = yup.object().shape({
  day: yup.string().required('Day is required'),
  time: yup.string().required('Time is required'),
});
