import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getOrders(req, res) {
  try {
    const orders = await prisma.order.findMany();  
    res.json(orders);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
}

export async function createOrder(req, res){
    const orderData = req.body;
    try{
        const newOrder = await prisma.order.create({
            data: orderData
        });
        res.status(201).json({
            status: "success",
            message: "Order created successfully",
            data: newOrder
        });
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}

export async function updateOrder(req, res){
    const { id } = req.params;
    const {status} = req.body;
    const orderData = req.body;
    try{
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {status}
        }); 
        res.json({
            status: "success",
            message: "Order updated successfully",
            data: updatedOrder
        });
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}