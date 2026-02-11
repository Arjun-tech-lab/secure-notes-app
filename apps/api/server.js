import Fastify from "fastify";
import { encrypt, decrypt } from "./utils/encryption.js";
import cors from "@fastify/cors";

const app = Fastify();

await app.register(cors, {
  origin: "*",
});

const notes = [];

app.get("/", async () => {
  return { message: "API is running" };
});

app.post("/encrypt", async (request, reply) => {
  const { text } = request.body;
  return encrypt(text);
});

app.post("/notes", async (request, reply) => {
  const { text } = request.body;

  const encryptedData = encrypt(text);

  const note = {
    id: Date.now(),
    ...encryptedData,
  };

  notes.push(note);

  return { message: "Note saved", note };
});

app.get("/notes", async () => {
  return notes.map((note) => ({
    id: note.id,
    text: decrypt(note),
  }));
});

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});
