import fs from "node:fs";
import path from "node:path";
import { generateApi, generateTemplates } from "swagger-typescript-api";
generateApi({
    name: "MySuperbApi.ts",
    // set to `false` to prevent the tool from writing to disk
    output: path.resolve(process.cwd(), "./src/__generated__"),
    input: path.resolve(process.cwd(), "./openapi/swagger.json"),
});
