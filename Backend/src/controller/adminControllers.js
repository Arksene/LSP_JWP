import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import 'dotenv/config'

const prisma = new PrismaClient();

export async function register (req, res) {
    const {username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
    try {
        const checkIsRegistered = await prisma.admin.findFirst({
            where: { username }
        });
        if (checkIsRegistered) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const register = await prisma.admin.create({
            data: {
                username,
                password: hashedPassword,
                email
    }})
        res.status(201).json({
            status: "success",
            message: "Admin registered successfully",
            data: register
        });
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}

export async function login (req, res) {
    const { username, password } = req.body;
    try {
        const user = await prisma.admin.findFirst({
            where: { username }
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
       res.json({
            status: "success",
            message: "Login successful",
            token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}