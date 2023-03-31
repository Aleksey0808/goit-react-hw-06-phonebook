import { Forma, Label, Text, Buttons } from './ContactForm.styles';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, clearContact } from 'redux/contactSlice';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().positive().required(),
});

const ContactForm = () => {
  const contacts = useSelector(state => state.contacts.items);

  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    contacts.some(item => item.name === values.name)
      ? Report.warning(`${values.name}`, 'Such a name already exists!', 'OK')
      : dispatch(addContact({ ...values, id: nanoid() }));

    resetForm();
  };

  const clearSubmit = () => {
    dispatch(clearContact());
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

        <Buttons type="submit">Add contact</Buttons>
        <Buttons onClick={clearSubmit} type="button">
          Clear
        </Buttons>
      </Forma>
    </Formik>
  );
};

export default ContactForm;
