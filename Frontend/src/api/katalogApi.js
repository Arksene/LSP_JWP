export async function getAllKatalog() {
    const response = await fetch('http://localhost:2000/api/v1/Katalog', {
    });
    if (!response.ok) {
        throw new Error('Failed to fetch katalog');
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export async function createKatalog(katalog) {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:2000/api/v1/addKatalog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(katalog),
    });
    if (!response.ok) {
        const text = await response.text();
        console.error('API error:', text);

        throw new Error('Failed to create katalog');
    }
    return await response.json();
}

export async function deleteKatalog(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:2000/api/v1/deleteKatalog/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete katalog');
    }
    return await response.json();
}

export async function updateKatalog(id, katalog) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:2000/api/v1/updateKatalog/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(katalog),
    });
    if (!response.ok) {
        throw new Error('Failed to update katalog');
    }
    return await response.json();
}