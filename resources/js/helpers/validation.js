import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const schemaLogin = yupResolver(
    yup.object({
        email: yup
            .string()
            .email("Email format is not valid!")
            .required("Email is required!"),
        password: yup.string().required("Password is required!"),
    })
);

export const schemaRegister = yupResolver(
    yup.object({
        name: yup.string().required("Name is required!"),
        email: yup
            .string()
            .email("Email format is not valid!")
            .required("Email is required!"),
        password: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/,
                "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            )
            .required("Password is required!"),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Password does'nt match!")
            .required("Password Confirmation is required!"),
    })
);

export const schemaForgotPassword = yupResolver(
    yup.object({
        email: yup
            .string()
            .email("Email format is not valid!")
            .required("Email is required!"),
    })
);

export const schemaResetPassword = yupResolver(
    yup.object({
        email: yup
            .string()
            .email("Email format is not valid!")
            .required("Email is required!"),
        password: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/,
                "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            )
            .required("Password is required!"),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], "Password does'nt match!")
            .required("Password Confirmation is required!"),
    })
);
