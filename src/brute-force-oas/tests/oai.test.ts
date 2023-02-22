import { describe, expect, test } from "vitest";
import { routesConfig } from "src/build-lambdas/lambdas-config";
import oaiJSON from "../openAPI.json";

/**
 * /tools/{id} -> /tools/:id
 */
const formatVariable = (path: string) => {
  return path.replace(/{/g, ":").replace(/}/g, "");
};

describe("oai", () => {
  test("All routes are present in the routes config", () => {
    // get all paths from the openAPI.json in the format {METHOD} {PATH}
    const oaiPaths = Object.entries(oaiJSON.paths)
      .map(([path, methods]) => {
        return Object.entries(methods).map(([method, _]) => {
          return `${method.toUpperCase()} ${path}`;
        });
      })
      .flat()
      .map(formatVariable)
      .sort();

    // get all paths from the routes config in the format {METHOD} {PATH}
    const routesConfigPaths = routesConfig
      .map(({ method, uriPath }) => {
        return `${method.toUpperCase()} ${uriPath}`;
      })
      .sort();

    expect(oaiPaths).toMatchInlineSnapshot(`
      [
        "DELETE /tools/:id",
        "GET /tools",
        "POST /login",
        "POST /signup",
        "POST /tools",
      ]
    `);
    expect(oaiPaths).toEqual(routesConfigPaths);
  });
});
