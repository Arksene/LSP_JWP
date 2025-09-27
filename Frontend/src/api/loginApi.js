export async function login(credentials) {
    const response = await fetch('http://localhost:2000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        let errorMessage = "Login failed";
        try {
            const data = await response.json();
            errorMessage = data.message || JSON.stringify(data);
        } catch {
            errorMessage = await response.text();
        }
        console.error('API error:', errorMessage);
        throw new Error(errorMessage);
    }
    // Jika login berhasil, return data JSON
    return await response.json();
}


export async function register(userInfo) {
    const response = await fetch('http://localhost:2000/api/v1/register', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
        let errorMessage = "Register failed";
        try {
            const data = await response.json();
            errorMessage = data.message || JSON.stringify(data);
        } catch {
            errorMessage = await response.text();
        }
        console.error('API error:', errorMessage);
        throw new Error(errorMessage);
    }
}