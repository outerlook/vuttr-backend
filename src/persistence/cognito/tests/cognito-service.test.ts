import { afterAll, describe, expect, test } from "vitest";
import { signUpUser } from "src/persistence/cognito/signUp";
import { login } from "src/persistence/cognito/login";
import { deleteUser } from "src/persistence/cognito/deleteUser";
import { config } from "dotenv";
import path from "path";

const setupTestEnvs = () => {
  // create a .env.test file with necessary envs for this test

  config({ path: path.resolve(__dirname, ".env.test") });
};

const testCredentials = {
  email: "teste@backendtest1233321.com",
  password: "BACKEND_test123",
};

describe("CognitoService", () => {
  setupTestEnvs();

  afterAll(async () => {
    const result = await deleteUser(testCredentials).catch((err) => {
      // if doesn't exist, it's fine
      if (err.message === "User does not exist.") {
        return;
      }
      throw err;
    });
  });

  // sequential tests, not individual because we need to create a user first
  test("entire flow", async () => {
    const signupResult = await signUpUser(testCredentials);
    expect(signupResult.user.getUsername()).toMatchInlineSnapshot(
      '"teste@backendtest1233321.com"'
    );

    const loginResult = await login(testCredentials);
    expect(loginResult.isValid()).toBe(true);
  });
});
