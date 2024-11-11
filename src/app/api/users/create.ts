import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, name } = req.body;

        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    profileSetup: false,
                    resumeUploaded: false,
                },
            });

            return res.status(201).json({ userId: user.id, user }); // Return user ID and user details
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
