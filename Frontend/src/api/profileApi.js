export async function getProfile() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:2000/api/v1/profil', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });
    if (!response.ok) {
        let errorMessage = "Failed to fetch profile";   
        try {
            const data = await response.json();
            errorMessage = data.message || JSON.stringify(data);
        } catch {
            errorMessage = await response.text();
        }
        console.error('API error:', errorMessage);
        throw new Error(errorMessage);
    }
    return await response.json()
}

export async function updateProfile(profile) {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:2000/api/v1/profil/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile),
    });
    if (!response.ok) {
        let errorMessage = "Failed to update profile";
        try {
            const data = await response.json();
            errorMessage = data.message || JSON.stringify(data);
        } catch {
            errorMessage = await response.text();
        }
        console.error('API error:', errorMessage);
        throw new Error(errorMessage);
    }
    return await response.json();
}