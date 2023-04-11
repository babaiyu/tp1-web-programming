import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../Components/Layout";
import { apiGetUser } from "../api";

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
            <section className="container mx-auto">
                {user !== null && token !== null ? (
                    <>
                        <h1 className="text-2xl font-extrabold">Welcome, {user?.name}</h1>
                    </>
                ) : (
                    <>
                        <p>Home</p>
                    </>
                )}
            </section>
        </Layout>
    );
}
