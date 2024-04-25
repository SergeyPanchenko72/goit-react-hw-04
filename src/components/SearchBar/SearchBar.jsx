import css from "./SearchBar.module.css";

import { Field, Form, Formik } from "formik";
import { CiSearch } from "react-icons/ci";

export default function SearchBar({ onSearch }) {
  return (
    <header className={css.container}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field className={css.input} type="text" name="query" />
          <button className={css.formBtn} type="submit">
            <CiSearch />
          </button>
        </Form>
      </Formik>
    </header>
  );
}
