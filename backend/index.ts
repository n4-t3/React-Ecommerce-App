import express, { Application, NextFunction, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { authentication } from "./middlewares/authentication";
import { admin } from "./middlewares/admin";
import helmet from "helmet";
import multer from "multer";
import path from "path";

configDotenv();

const MONGODBURL = process.env.MONGODBURL;
const PORT = process.env.PORT ? process.env.PORT : 5000;

if (MONGODBURL) {
  mongoose.connect(MONGODBURL);
  const db = mongoose.connection;
  db.once("open", () => {
    console.log("connected to Mongodb");
  });
  db.on("error", (err: Error) => {
    console.error("Error connecting to Mongodb:", err);
  });
} else {
  throw new Error("Couldn't find MONGODBURL");
}

const app: Application = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname);
  },
});

const upload = multer({ storage });

app.post("/images", upload.single("image"), (req, res) => {
  // The 'image' in upload.single('image') should match the field name in your HTML form
  if (!req.file) {
    return res.status(400).send("No image uploaded.");
  }
  const { originalname, mimetype, size } = req.file;
  res.status(200).json({
    message: "Image uploaded successfully",
    filename: originalname,
    mimetype,
    size,
  });
});

app.get("/images/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, "images", filename));
});

app.use("/images", express.static("images"));

// app.use(helmet());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Origin-Methods",
    "GET, POST, PUT, DELETE"
  );
  next();
});

app.use(express.json());

app.use(authentication);
app.use(admin);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Head to /graphql endpoint to make requests");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
