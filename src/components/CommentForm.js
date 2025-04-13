import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CommentForm.css';

const CommentForm = ({ onSubmit, parentId = null, initialData = null }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      text: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Введите имя'),
      email: Yup.string().email('Неверный email').required('Введите email'),
      phone: Yup.string().matches(/^\+?\d{10,15}$/, 'Неверный телефон').required('Введите телефон'),
      text: Yup.string().required('Введите комментарий'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit({ ...values, parentId });
      resetForm();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (initialData) {
      formik.setValues({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        text: initialData.text,
      });
    }
  }, [initialData]);

  return (
    <form onSubmit={formik.handleSubmit} className="comment-form">
      <input name="name" placeholder="ФИО" value={formik.values.name} onChange={formik.handleChange} />
      {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}

      <input name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
      {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}

      <input name="phone" placeholder="Телефон" value={formik.values.phone} onChange={formik.handleChange} />
      {formik.touched.phone && formik.errors.phone && <div className="error">{formik.errors.phone}</div>}

      <textarea name="text" placeholder="Комментарий" value={formik.values.text} onChange={formik.handleChange} />
      {formik.touched.text && formik.errors.text && <div className="error">{formik.errors.text}</div>}

      <button type="submit">{initialData ? 'Сохранить' : 'Оставить комментарий'}</button>
    </form>
  );
};

export default CommentForm;
