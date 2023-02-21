import { generateRoutesConfig } from "src/api-routes/generator-scripts/generate-routes-config";
import { GENERATED_PATH, ROOT_PATH } from "src/api-routes/generator-scripts/config";

export const buildRoutes = async () => {
  await generateRoutesConfig(ROOT_PATH, GENERATED_PATH);
};
