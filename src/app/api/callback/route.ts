import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (userId) {
    // Check if the user already exists
    const user = await prisma.user.upsert({
      where: { email: userId }, // Assuming userId is the email
      update: {},
      create: { email: userId, name: '', profileSetup: false, resumeUploaded: false },
    });

    // Example of creating an interview
    const interview = await prisma.interview.create({
      data: {
        jobPosition: 'Software Engineer',
        jobDescription: 'Develop and maintain software applications.',
        jobExperience: '2+ years',
        userId: user.id,
      },
    });

    return NextResponse.json({ message: 'User authenticated', userId, user, interview });
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

