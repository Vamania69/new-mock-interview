import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { email, name } = await req.json();

    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email,
                name: name || '',
                profileSetup: false,
                resumeUploaded: false,
            },
        });
    }

    return NextResponse.json({ message: 'User retrieved/created successfully', user });
}
