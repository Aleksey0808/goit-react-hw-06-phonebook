import { Forma, Label, Text } from './ContactForm.styles';
import PropTypes from 'prop-types';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().positive().required(),
});

const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    onSubmit(values);
    resetForm();
  };

  const initialValues = {
    name: '',
    number: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Forma>
        <Label htmlFor="name">
          <Text>Name</Text>
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component="div" />
        </Label>

        <Label htmlFor="number">
          <Text>Phone</Text>
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" component="div" />
        </Label>

        <button type="submit">Add contact</button>
      </Forma>
    </Formik>
  );
};

ContactForm.prototype = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
