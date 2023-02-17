import env from "../config/env";

const {base_url} = env;

export const login = async (email, password) => {
    const response = await fetch(`${base_url}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    const data = await response.json();
    return data;
};