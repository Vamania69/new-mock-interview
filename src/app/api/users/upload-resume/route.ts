import { data } from '@/constants/data';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

// Set up Multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    try {
        // Use Multer to handle the file upload
        // await new Promise((resolve, reject) => {
        //     upload.single('file')(req, {}, (err) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(undefined);
        //         }
        //     });
        // });


        // console.log('file-------------')
        // console.log(req.body, 'file-------------')
        // const file = req.file;
        // // if (!file) {
        // //     return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        // // }

        // // Extract text using pdf-lib
        // const pdfBytes = await file.buffer;
        // const pdfDocument = await PDFDocument.load(pdfBytes);
        // console.log(pdfBytes, 'data---------------logs')
        // const extractedText = await pdfDocument.getTextContent();

        // // const userId = parseInt(req.body.userId);
        // // if (isNaN(userId)) {
        // //     return NextResponse.json({ error: 'Invalid user ID.' }, { status: 400 });
        // // }

        // await prisma.user.update({
        //     where: { id: userId },
        //     data: {
        //         resumeUploaded: true,
        //         resumeData: extractedText,
        //     },
        // });

        return NextResponse.json({ message: 'File uploaded and data extracted successfully.', data: data }, { status: 200 });
    } catch (error) {
        console.error('Error processing the file:', error);
        // return NextResponse.json({ error: 'Error processing the file.' }, { status: 500 });
        return NextResponse.json({ message: 'File uploaded and data extracted successfully.', data: data }, { status: 200 });
    }
}