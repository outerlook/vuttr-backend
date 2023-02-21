import fs from "fs";
import path from "path";

export function clearDirectory(directory: string) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);

    if (fs.statSync(filePath).isDirectory()) {
      clearDirectory(filePath);
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }
}