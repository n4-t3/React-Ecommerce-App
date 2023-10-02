import express, { Application, NextFunction, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const MONGODBURL = process.env.MONGODBURL;
const PORT = process.env.PORT ? process.env.PORT : 3000;

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

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Origin-Methods",
    "GET, POST, PUT, DELETE"
  );
  next();
});

app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
