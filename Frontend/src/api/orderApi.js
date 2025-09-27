export async function getAllOrder(orderData) {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:2000/api/v1/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        let errorMessage = "Failed to fetch orders";    
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

export async function createOrder(orderData) {
    const response = await fetch('http://localhost:2000/api/v1/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        let errorMessage = "Failed to create order";
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

export async function updateOrder(id, orderData) {
    const token = localStorage.getItem('token');
    const fixedOrderData = {
      ...orderData,
      status: orderData.status === "approve" || orderData.status === "Approve" ? "Approve" : orderData.status
    };
    console.log("Updating order:", id, fixedOrderData);
    const response = await fetch(`http://localhost:2000/api/v1/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(fixedOrderData),
    });
    console.log("Response status:", response.status);
    let result = null;
    try {
        result = await response.json();
        console.log("Response JSON:", result);
    } catch {
        console.warn("Response tidak mengembalikan JSON");
    }

    if (!response.ok) {
        const errorMessage = result?.message || `Failed to update order, status ${response.status}`;
        throw new Error(errorMessage);
    }

    return result;;
}