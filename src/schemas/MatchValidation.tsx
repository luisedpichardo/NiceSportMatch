import * as yup from 'yup';

export const matchValidation = yup.object().shape({
  address: yup.string().required('Address is Required'),
  day: yup.string().required('Day is required'),
  time: yup.string().required('Time is required'),
});
