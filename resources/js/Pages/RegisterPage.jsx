import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { useForm, Controller } from "react-hook-form";
import Layout from "../Components/Layout";
import InputText from "../Components/InputText";
import { schemaRegister } from "../helpers/validation";
import { apiRegister } from "../api";
import Alert from "../Components/Alert";

export default function RegisterPage() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        resolver: schemaRegister,
    });

    const [errorMessage, setErrorMessage] = useState({
        message: null,
        type: null,
    });

    const onSubmit = async (data) => {
        await apiRegister(data)
            .then((res) => {
                window.location.href =
                    "/signin?message=Success sign-up!&type=success";
            })
            .catch((err) => {
                const message =
                    JSON.stringify(err?.response?.data) ?? err?.message;
                setErrorMessage({ message, type: "danger" });
                // alert(JSON.stringify(err?.response?.data) ?? err?.message);
            });
    };

    return (
        <Layout>
            <Alert
                message={errorMessage?.message}
                type={errorMessage?.type}
                show={errorMessage?.message !== null}
            />

            <section className="container mx-auto max-w-7xl">
                <div className="mt-8 text-center flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Sign Up</h1>
                    <h2 className="text-lg">Register as user here...</h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center"
                >
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <InputText
                                label="Name"
                                type="text"
                                placeholder="Enter your name"
                                errorMessage={errors?.name?.message ?? ""}
                                onChange={field.onChange}
                            />
                        )}
                    />
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
                            />
                        )}
                    />

                    <button
                        className="btn btn-primary btn-block max-w-xs"
                        type="submit"
                    >
                        Sign Up
                    </button>

                    <p className="text-center">
                        Already have an account?{" "}
                        <Link href="/signin">
                            <button className="btn btn-link" type="button">
                                Sign In here
                            </button>
                        </Link>
                    </p>
                </form>
            </section>
        </Layout>
    );
}
