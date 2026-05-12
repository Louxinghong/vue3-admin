import { writeFileSync } from "node:fs";
import openapiTS from "openapi-typescript";
import { resolve } from "./util.js";

async function genSchema() {
  const file = resolve("/src/types/schema.d.ts");
  const data = await openapiTS("");

  writeFileSync(file, data, { encoding: "utf-8" });
}

genSchema();
