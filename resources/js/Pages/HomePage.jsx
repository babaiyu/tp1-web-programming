import React from "react";
import Layout from "../Components/Layout";

export default function HomePage({ token }) {
    return (
        <Layout token={token}>
            <h1>HomePage</h1>
        </Layout>
    );
}
