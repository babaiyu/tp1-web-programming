import React, { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "@inertiajs/react";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import dayjs from "dayjs";
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
        setValue,
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
    const [countFail, setCountFail] = useState(0);
    const [loading, setLoading] = useState(false);

    const captchaRef = useRef(null);

    const onSubmit = async (data) => {
        const captchaToken = captchaRef.current.getValue();

        if (captchaToken) {
            setLoading(true);
            await apiLogin(data)
                .then((res) => {
                    const response = res.data;
                    localStorage.setItem("TOKEN", response?.token);

                    window.location.href = "/";
                })
                .catch((err) => {
                    setValue("password", "");
                    const message =
                        err?.response?.data?.message ?? err?.message;
                    setError({ message, type: "danger" });
                    const totalFail = countFail + 1;
                    setCountFail(totalFail);

                    if (totalFail > 2) {
                        const failTime = dayjs().add(30, "seconds");
                        localStorage.setItem("FAIL_TIME", failTime);
                    }
                })
                .finally(() => {
                    captchaRef.current.reset();
                    setLoading(false);
                });
        } else {
            alert("Failed verify captcha!");
            captchaRef.current.reset();
        }
    };

    const disabledButton = useMemo(() => {
        const failTime = localStorage.getItem("FAIL_TIME") ?? null;

        if (failTime !== null && dayjs().isBefore(failTime)) {
            return true;
        }

        return false;
    }, [localStorage.getItem("FAIL_TIME")]);

    return (
        <Layout isForGuest>
            <Alert
                message={error?.message ?? errorMessage?.message}
                type={error?.type ?? errorMessage?.type}
                show={errorMessage?.message !== null || error?.message !== null}
            />

            <section className="container mx-auto max-w-7xl mt-28">
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
                                onBlur={field.onBlur}
                                value={field.value}
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
                                onBlur={field.onBlur}
                                value={field.value}
                            />
                        )}
                    />

                    <ReCAPTCHA
                        ref={captchaRef}
                        sitekey="6LdIXnolAAAAAKGZCtYOs_T1sYN_LLqGjwdbCv_W"
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
                        className={clsx(
                            "btn btn-primary btn-block max-w-xs",
                            disabledButton || loading && "btn-disabled",
                            loading && "loading"
                        )}
                        type="submit"
                        disabled={disabledButton}
                    >
                        Sign In
                    </button>

                    {disabledButton ? (
                        <span className="text-red-800 text-sm italic mt-2">
                            Sorry, you are allowed to login again after 30
                            seconds from your last error.
                        </span>
                    ) : null}

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
