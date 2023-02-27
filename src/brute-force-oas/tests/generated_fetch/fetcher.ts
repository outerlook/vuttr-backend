import { Fetcher } from "openapi-typescript-fetch";
import './fetch-polyfill'

import { paths } from "src/brute-force-oas/tests/generated_fetch/paths";

const fetcher = Fetcher.for<paths>();
const API_URL = "https://d89pc43zc5.execute-api.sa-east-1.amazonaws.com/dev/";

// global configuration
fetcher.configure({
  baseUrl: API_URL,
});

// create fetch operations
const login = fetcher.path("/login").method("post").create();
const signup = fetcher.path("/signup").method("post").create();
const createTool = fetcher.path("/tools").method("post").create();
const getTools = fetcher.path("/tools").method("get").create();
const deleteTool = fetcher.path("/tools/{id}").method("delete").create();

export const vuttrApi = {
  login,
  signup,
  createTool,
  getTools,
  deleteTool,
};
