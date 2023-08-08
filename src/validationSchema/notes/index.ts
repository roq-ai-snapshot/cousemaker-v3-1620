import * as yup from 'yup';

export const notesValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
});
