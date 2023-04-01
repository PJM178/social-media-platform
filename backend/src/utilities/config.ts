import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const CORS = process.env.CORS;

export {
  DATABASE_URL, PORT, SECRET, CORS
};