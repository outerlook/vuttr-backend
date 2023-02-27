import { describe, expect, test } from "vitest";
import { vuttrApi } from "src/brute-force-oas/tests/generated_fetch/fetcher";

describe("service", () => {
  test("signup", async () => {
    const testCredentials = {
      email: "test_vuttr@backend1mskajvuttr.com",
      password: "123ABCabc!",
    };
    const response = await vuttrApi.signup(testCredentials);
    expect(response.status).toBe(200);
    expect(response.data).toMatchInlineSnapshot()
  });
});
