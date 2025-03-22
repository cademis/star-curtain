import { trpcExpress } from "@repo/trpc-server";
import express from "express";
// import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
// app.use(cookieParser());
app.use(cors());

app.use("/trpc", trpcExpress);

app.listen(3000, () => console.log("listening on http://localhost:3000"));
