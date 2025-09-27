import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getKatalog(req, res) {
  try {
    const katalogs = await prisma.katalog.findMany(); 
    res.json(katalogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createKatalog(req, res){
    const {namaKatalog, deskripsi, harga} = req.body;
    try{
        const newKatalog = await prisma.katalog.create({
            data: {
                namaKatalog,
                deskripsi,
                harga
            }
        });
        res.status(201).json({
            status: "success",
            message: "Katalog created successfully",
            data: newKatalog
        });
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}

export async function deleteKatalog(req, res) {
    const { id } = req.params;
    try {
      const deletedKatalog = await prisma.katalog.delete({
        where: { id: parseInt(id) },
      });
      res.json({
        status: "success",
        message: "Katalog deleted successfully",
        data: deletedKatalog,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  export async function updateKatalog(req, res) {
    const { id } = req.params;
    const { namaKatalog, deskripsi, harga } = req.body;
    try {
        const updateKatalog = await prisma.katalog.update({
            where: { id: parseInt(id) },
            data: {
                namaKatalog,
                deskripsi,
                harga
            }
        });
        res.json({
            status:"success",
            message:"Katalog updated successfully",
            data: updateKatalog
        });
    } catch (err) {
        res.status(500).json({ error: err.message})
    };
}