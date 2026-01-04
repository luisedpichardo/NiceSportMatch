import * as yup from 'yup';

export const matchValidation = yup.object().shape({
  time: yup.string().required('Time is required'),
});
