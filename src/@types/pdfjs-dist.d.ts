declare module 'pdfjs-dist/build/pdf' {
    export const GlobalWorkerOptions: {
        workerSrc: string;
    };
    export function getDocument(source: any): {
        promise: Promise<any>;
    };
}

declare module 'pdfjs-dist/build/pdf.worker' {
    const worker: string;
    export default worker;
}

declare module 'pdfjs-dist/build/pdf.worker.entry' {
    const worker: string;
    export default worker;
}

declare module 'pdfjs-dist/legacy/build/pdf' {
    export const getDocument: (source: any) => {
        promise: Promise<any>;
    };

    export const GlobalWorkerOptions: {
        workerSrc: string;
    };
}

