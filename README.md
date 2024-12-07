# Mock Interviewer Application

## Overview

The Mock Interviewer is a web application designed to help users prepare for job interviews by simulating real-world interview scenarios. It utilizes the Gemini 1.5 API for generating interview questions and feedback, Prisma for database management, and Clerk for user authentication.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **Prisma**: An ORM for Node.js and TypeScript that simplifies database access.
- **Clerk**: A user authentication service that provides secure sign-in and user management.
- **Gemini 1.5 API**: An AI-powered API for generating interview questions and feedback.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- A PostgreSQL database (or any other supported database)

## Getting Started

Follow these steps to set up and run the application:

### 1. Clone the Repository

```bash
git clone https://github.com/Vamania69/new-mock-interview
cd new-mock-interview
```

### 2. Install Dependencies

Run the following command to install the required packages:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and define the following environment variables:

```plaintext

# Clerk API Keys
CLERK_FRONTEND_API=<your_clerk_frontend_api>
CLERK_API_KEY=<your_clerk_api_key>

# Database URL
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# Gemini API Key
GEMINI_API_KEY=<your_gemini_api_key>
```

### 4. Set Up the Database

Run the following command to create the database schema using Prisma:

```bash
npx prisma migrate dev --name init
```

### 5. Start the Development Server

You can now start the development server with the following command:

```bash
npm run dev
```

The application will be running at `http://localhost:3000`.




## API Endpoints

The application provides several API endpoints for managing interviews, questions, and user data. Below are some of the key endpoints:

- **POST /api/interviews/create**: Create a new interview.
- **POST /api/interviews/[id]/question**: Generate a new question for a specific interview.
- **POST /api/interviews/[id]/feedback**: Generate feedback based on user answers.
- **POST /api/users/create**: Create a new user.
- **POST /api/users/upload-resume**: Upload a user's resume.

Refer to the source code for more details on the API structure and usage.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. 

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Clerk](https://clerk.dev/)
- [Gemini API](https://www.google.com/)
