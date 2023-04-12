import React, { useEffect, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { apiLogout } from "../api";

const theDate = new Date();

export default function Layout({ children, isForGuest = false }) {
    const [token, setToken] = useState(null);

    const onLogout = async (e) => {
        e?.preventDefault();

        await apiLogout(token).finally(async () => {
            await Promise.all([
                setToken(null),
                localStorage.clear(),
                (window.location.href = "/"),
            ]);
        });
    };

    useEffect(() => {
        const tempToken = localStorage.getItem("TOKEN") ?? null;
        setToken(tempToken);

        if (isForGuest && tempToken !== null) {
            window.location.replace("/");
        }
    }, [isForGuest]);

    return (
        <>
            <Head>
                <title>TP2 Auth</title>
                <meta name="description" content="Your page description" />
            </Head>

            <header>
                <nav className="navbar container mx-auto bg-base-100">
                    <div className="flex-1">
                        <Link
                            href="/"
                            className="btn btn-ghost normal-case text-xl"
                            preserveState
                        >
                            TP2 Auth
                        </Link>
                    </div>
                    {token === null ? (
                        <div className="flex-none">
                            <ul className="menu menu-horizontal px-1">
                                <li>
                                    <Link href="/signin">Sign In</Link>
                                </li>
                                <li>
                                    <Link href="/signup">Sign Up</Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex-none gap-2">
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full">
                                        <img src="/images/avatar.jpg" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <a onClick={onLogout}>Sign Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            <main>{children}</main>

            <footer className="footer footer-center p-10 bg-primary text-primary-content mt-12">
                <div>
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="inline-block fill-current"
                    >
                        <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    <p className="font-bold">
                        TP2 Auth. <br />
                        Tugas Personal 2 - Autentikasi Laravel
                    </p>
                    <p>
                        Copyright © {theDate.getFullYear()} - All right reserved
                    </p>
                </div>
            </footer>
        </>
    );
}
