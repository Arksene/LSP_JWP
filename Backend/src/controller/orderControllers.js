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

export async function updateOrder(req, res) {
    console.log('updateOrder dipanggil!');
    console.log('Params:', req.params);
    console.log('Body:', req.body);

    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status }
        });
        console.log('Order updated:', updatedOrder);

        // Kirim email jika status diubah menjadi 'approve'
        if (status.toLowerCase() === 'approve' && updatedOrder.email) {
            console.log('Mengirim email ke:', updatedOrder.email);
            try {
                const { sendEmail } = await import('../lib/sendEmail.js');

                const message = `
Halo ${updatedOrder.nama},

Order Anda telah di-approve dengan detail sebagai berikut:

- Pilihan Paket: ${updatedOrder.pilihanKatalog}
- Tanggal Order: ${new Date(updatedOrder.tanggal).toLocaleDateString()}
- Alamat: ${updatedOrder.alamat}
- Nomor Telepon: ${updatedOrder.nomorTelepon}

Terima kasih telah melakukan pemesanan dengan kami!

Salam,
Tim Jewepe Wedding
                `;

                await sendEmail(
                    updatedOrder.email,
                    'Order Anda Telah Diterima & Disetujui',
                    message
                );
            } catch (emailErr) {
                console.error('Gagal kirim email:', emailErr);
            }
        }

        res.json({
            status: "success",
            message: "Order updated successfully",
            data: updatedOrder
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
