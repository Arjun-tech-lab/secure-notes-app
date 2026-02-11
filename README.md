🔐 Secure Notes

Secure Notes is a full-stack application that allows users to store notes securely using AES-256-GCM encryption. Notes are encrypted in the backend before storage and decrypted only when retrieved, demonstrating secure data handling and modern full-stack architecture.

This project was built as a real-world application using Turborepo, Next.js, and Fastify, and deployed using Vercel and Render.

🚀 Live Demo

Frontend (Vercel):
👉 https://your-frontend-url.vercel.app

Backend API (Render):
👉 https://your-backend-url.onrender.com


User Browser
      ↓
Next.js Frontend (Vercel)
      ↓
Fastify Backend API (Render)
      ↓
AES-256-GCM Encryption
      ↓
Encrypted Storage (In-memory)

Flow

User enters a note in the UI.

Frontend sends the note to the Fastify API.

Backend encrypts the note using AES-256-GCM.

Encrypted data is stored.

When fetched, notes are decrypted and displayed to the user.

🔐 Why AES-256-GCM?

AES-GCM provides:

Strong symmetric encryption

Authentication tag for integrity verification

Protection against data tampering

Efficient performance for web applications

This ensures that stored data remains confidential and secure.

🧰 Tech Stack
Frontend

Next.js

React

Tailwind CSS

Backend

Fastify

Node.js

Crypto (AES-256-GCM)

Tooling

Turborepo (Monorepo setup)

GitHub

Deployment

Vercel (Frontend)

Render (Backend)

secure-notes/
│
├── apps/
│   ├── web/      # Next.js frontend
│   └── api/      # Fastify backend
│
├── packages/
└── turbo.json


For simplicity, notes are stored in memory.
In a production environment, this would be replaced with a persistent database such as PostgreSQL or MongoDB.


👨‍💻 Author

Arjun Indavara