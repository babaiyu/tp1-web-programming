import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { useForm, Controller } from "react-hook-form";
import Layout from "../Components/Layout";
import InputText from "../Components/InputText";
import { schemaResetPassword } from "../helpers/validation";
import { apiResetPassword } from "../api";
import Alert from "../Components/Alert";

export default function ResetPasswordPage({ token = null, email = null }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            password_confirmation: "",
        },
        resolver: schemaResetPassword,
    });

    const [errorMessage, setErrorMessage] = useState({
        message: null,
        type: null,
    });

    const onSubmit = async (data) => {
        await apiResetPassword(token, data)
            .then((res) => {
                window.location.href =
                    "/signin?message=Success reset password&type=success";
            })
            .catch((err) => {
                const message =
                    JSON.stringify(err?.response?.data?.message) ??
                    err?.message;
                setErrorMessage({ message, type: "danger" });
            });
    };

    useEffect(() => {
        setValue("email", email);
    }, []);

    return (
        <Layout isForGuest>
            <Alert
                message={errorMessage?.message}
                type={errorMessage?.type}
                show={errorMessage?.message !== null}
            />

            <section className="container mx-auto max-w-7xl">
                <div className="mt-8 text-center flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <h2 className="text-lg">
                        Finish this step to reset your password!
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center"
                >
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <InputText
                                label="Email"
                                type="email"
                                placeholder="eg: hello@mail.com"
                                errorMessage={errors?.email?.message ?? ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                                disabled
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <InputText
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                errorMessage={errors?.password?.message ?? ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password_confirmation"
                        render={({ field }) => (
                            <InputText
                                label="Password Confirmation"
                                type="password"
                                placeholder="Enter your password Confirmation"
                                errorMessage={
                                    errors?.password_confirmation?.message ?? ""
                                }
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                            />
                        )}
                    />

                    <button
                        className="btn btn-primary btn-block max-w-xs"
                        type="submit"
                    >
                        Reset Password
                    </button>

                    <p className="text-center">
                        <Link href="/signin">
                            <button className="btn btn-link" type="button">
                                {"<-"} Back to Sign In
                            </button>
                        </Link>
                    </p>
                </form>
            </section>
        </Layout>
    );
}
