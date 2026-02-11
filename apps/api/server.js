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

app.listen({ port: 4000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server running on http://localhost:4000");
});
app.post("/encrypt", async (request, reply) => {
  const { text } = request.body;
  const result = encrypt(text);
  return result;
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
  const decryptedNotes = notes.map((note) => ({
    id: note.id,
    text: decrypt(note),
  }));

  return decryptedNotes;
});

