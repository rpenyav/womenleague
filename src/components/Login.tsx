import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { LoginData } from "../models/login";
import { useAuth } from "../context/AuthContext";

interface LoginComponentProps {
  onSuccess?: () => void;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const Login: React.FC<LoginComponentProps> = ({ onSuccess }) => {
  const { login } = useAuth(); // Usa login desde useAuth

  const handleSubmit = async (values: LoginData & { rememberme: boolean }) => {
    try {
      await login(values.email, values.password); // Ya no necesitas el parámetro rememberme aquí
      onSuccess?.();
      window.location.reload();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <p>¿Ya tienes una cuenta?, accede</p>

      <Formik
        initialValues={{ email: "", password: "", rememberme: false }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex-form-group">
              <div>
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-errors">
                <ErrorMessage name="email" />
              </div>
            </div>
            <Field name="email" type="email" placeholder="Enter email" />

            <div className="flex-form-group">
              <div>
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-errors">
                <ErrorMessage name="password" />
              </div>
            </div>

            <Field
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <div>
              <Field name="rememberme" type="checkbox" />
            </div>
            <div>
              <Link to="/forgot">¿Olvidaste tu contraseña?</Link>
            </div>

            <div className="form-dividor"></div>
            <div className="d-flex justify-content-center w-100  more-margin">
              <button type="submit">Entrar a tu área</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
