import { expect, test } from "vitest";
import { processFile } from "src/api-routes/generator-scripts/process-file/process-file";
import path from "path";
import fs from "fs";
import { filepathToUripath } from "src/api-routes/generator-scripts/process-file/filepath-to-uripath";

test("process-file", () => {
  // "src/api-routes/root/tools/index.ts"
  const absoluteFilepath = require.resolve("./example.ts");
  const { filepath, uriPath, functionNames } = processFile(
    absoluteFilepath,
    path.resolve(__dirname)
  );
  expect(functionNames).toEqual(["get", "post", "teste"]);
  expect(fs.existsSync(filepath)).toBe(true);
  expect(uriPath).toBe("/example");
});

test("path to uri", () => {
  const paths = [
    "/src/api-routes/root/tools/index.ts",
    "/src/api-routes/root/tools/[id].ts",
    "/src/api-routes/root/tools/[id]/other.ts",
  ];
  const expected = ["/tools", "/tools/:id", "/tools/:id/other"];
  paths.forEach((path, index) => {
    expect(
      filepathToUripath({
        absoluteFilepath: path,
        rootPath: "/src/api-routes/root",
      })
    ).toBe(expected[index]);
  });
});
