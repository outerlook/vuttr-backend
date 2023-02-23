import { describe, expect, test } from "vitest";
import { signUpUser } from "src/persistence/cognito/signUp";

describe("CognitoService", () => {
  const setupEnvs = () => {
    // AWS_COGNITO_USER_POOL_ID
    // AWS_COGNITO_CLIENT_ID
    process.env.AWS_COGNITO_USER_POOL_ID = "us-east-1_ttj7q0i2V";
    process.env.AWS_COGNITO_CLIENT_ID = "";
  };
  const email = "teste@backendtest1233321.com";
  const password = "12345678";
  test("should be able to signup", async () => {
    const result = await signUpUser({ password: password, email: email });
    expect(result.userSub).toMatchInlineSnapshot();
  });

  test("should be able to login", async () => {});
});
