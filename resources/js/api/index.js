import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 36000,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
});

export async function apiLogin(body) {
    return await instance.post("/login", body);
}

export async function apiRegister(body) {
    return await instance.post("/register", body);
}

export async function apiLogout(token) {
    return await instance.delete("/logout", {
        headers: { Authorization: "Bearer " + token },
    });
}

export async function apiGetUser(token) {
    return await instance.get("/user", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export async function apiForgotPassword(body) {
    return await instance.post("/forgot-password", body);
}

export async function apiResetPassword(token, body) {
    return await instance.post(`/reset-password/${token}`, body);
}
