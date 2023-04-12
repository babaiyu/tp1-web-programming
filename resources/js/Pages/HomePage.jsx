import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../Components/Layout";
import { apiGetUser } from "../api";
import { Link } from "@inertiajs/react";

export default function HomePage() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useLayoutEffect(() => {
        const tempToken = localStorage.getItem("TOKEN");
        setToken(tempToken);
    }, []);

    useEffect(() => {
        (async () => {
            if (token !== null) {
                await apiGetUser(token).then((res) => {
                    setUser(res.data);
                });
            }
        })();
    }, [token]);

    return (
        <Layout headTitle="Home">
            {user !== null && token !== null ? (
                <>
                    <div className="hero min-h-screen">
                        <div className="hero-content flex-col lg:flex-row">
                            <img
                                src="/images/avatar.jpg"
                                className="max-w-sm rounded-xl shadow-2xl"
                            />
                            <div className="md:w-1/2 w-full">
                                <h1 className="text-5xl font-bold">
                                    Hi, {user?.name}
                                </h1>
                                <h2 className="text-xl italic">
                                    {user?.email}
                                </h2>
                                <p className="py-6">
                                    Thank you <strong>{user?.name}</strong> for
                                    sign-in to our platform. We are happy that
                                    you can finish your account and here you
                                    are.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className="hero min-h-screen"
                        style={{
                            backgroundImage: `url("/images/bg_capybara.jpg")`,
                        }}
                    >
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">
                                    Hi there 👋
                                </h1>
                                <p className="mb-5">
                                    Welcome to TP2 Auth, this website is for
                                    learning how to implement Authentication in
                                    Laravel & React JS. You can do Sign-In,
                                    Sign-Up, and Forgot Password.
                                </p>
                                <Link
                                    className="btn btn-primary"
                                    href="/signin"
                                >
                                    Getting Started
                                </Link>
                                {/* <button className="btn btn-primary">
                                    Get Started
                                </button> */}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
}
