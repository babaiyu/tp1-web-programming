import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { useForm, Controller } from "react-hook-form";
import Layout from "../Components/Layout";
import InputText from "../Components/InputText";
import Alert from "../Components/Alert";
import { schemaLogin } from "../helpers/validation";
import { apiLogin } from "../api";

export default function LoginPage({ errorMessage }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: schemaLogin,
    });

    const [error, setError] = useState({
        message: null,
        type: null,
    });

    const onSubmit = async (data) => {
        await apiLogin(data)
            .then((res) => {
                const response = res.data;
                sessionStorage.setItem("TOKEN", response?.token);

                window.location.href = "/";
            })
            .catch((err) => {
                const message = err?.response?.data?.message ?? err?.message;
                setError({ message, type: "danger" });
                // alert(JSON.stringify(err?.response?.data) ?? err?.message);
            });
    };

    return (
        <Layout>
            <Alert
                message={error?.message ?? errorMessage?.message}
                type={error?.type ?? errorMessage?.type}
                show={errorMessage?.message !== null || error?.message !== null}
            />

            <section className="container mx-auto max-w-7xl">
                <div className="mt-8 text-center flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Sign In</h1>
                    <h2 className="text-lg">Please sign-in to continue</h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center"
                >
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: true }}
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
                        rules={{ required: true }}
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

                    <div className="max-w-xs w-full text-end mt-4 mb-2">
                        <Link
                            href="/forgot-password"
                            className="hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        className="btn btn-primary btn-block max-w-xs"
                        type="submit"
                    >
                        Sign In
                    </button>

                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link href="/signup">
                            <button className="btn btn-link" type="button">
                                Sign Up here
                            </button>
                        </Link>
                    </p>
                </form>
            </section>
        </Layout>
    );
}
