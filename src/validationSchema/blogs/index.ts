import * as yup from 'yup';

export const blogValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  creator_id: yup.string().nullable(),
});
