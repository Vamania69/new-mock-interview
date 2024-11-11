// // src/app/api/users/route.ts
// import { getAuth } from '@clerk/nextjs/server';
// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   const { userId } = getAuth(req);

//   // Check if the user is authenticated
//   if (!userId) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   try {
//     // Upsert user in the database
//     const user = await prisma.user.upsert({
//       where: { email: userId }, // Assuming userId is the email
//       update: {},
//       create: { email: userId, name: '', profileSetup: false, resumeUploaded: false },
//     });

//     // Create an interview example
//     const interview = await prisma.interview.create({
//       data: {
//         jobPosition: 'Software Engineer',
//         jobDescription: 'Develop and maintain software applications.',
//         jobExperience: '2+ years',
//         userId: user.id, // Relating the interview to the user
//       },
//     });

//     return NextResponse.json({ message: 'User authenticated', userId, user, interview });
//   } catch (error) {
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }
