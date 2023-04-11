import React from "react";
import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <>
            <header>
                <navbar className="navbar container mx-auto bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">
                            TP2 Auth
                        </a>
                    </div>
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
                                    <Link href="/signin">Profile</Link>
                                </li>
                                <li>
                                    <Link href="#">Sign Out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </navbar>
            </header>

            <main>{children}</main>
        </>
    );
}
