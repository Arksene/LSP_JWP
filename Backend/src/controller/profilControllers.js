import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProfil(req, res) {
    try {
        const profile = await prisma.profil.findMany();
        res.json(profile);
    } catch (err){
        res.status(500).json({error : err.message})
    }
}

export async function updateProfil(req,res){
    const data = req.body;
    try {
        const updateProfil = await prisma.profil.update({
            where : {id: 1},
            data,
        })
        res.json({
            status: "success",
            message: "Profil updated successfully",
            data: updateProfil
        });
    } catch (err) {
        res.status(500).json({ error:err.message})
    }
}