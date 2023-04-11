import React, { useEffect, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { apiLogout } from "../api";

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
        </>
    );
}
