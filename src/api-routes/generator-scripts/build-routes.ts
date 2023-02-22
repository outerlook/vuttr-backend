import { generateRoutesConfig } from "src/api-routes/generator-scripts/generate-routes-config";
import { OUT_ROUTES_DIR_PATH, ROOT_PATH } from "src/api-routes/routes-config";

export const buildRoutes = async () => {
  await generateRoutesConfig(ROOT_PATH, OUT_ROUTES_DIR_PATH);
};
