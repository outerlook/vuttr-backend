import { produceLambdaHandler } from "src/build-lambdas/api-integration";
import { expect, test } from "vitest";
import { get } from "src/api-routes/root/tools";

test("works!", async () => {
  const sampleEvent = {
    version: "2.0",
    routeKey: "GET /posts",
    rawPath: "/posts",
    rawQueryString: "",
    cookies: [],
    headers: {
      accept: "application/json",
      "accept-encoding": "gzip, deflate, br",
      "content-type": "application/json",
      host: "api.example.com",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
      "x-forwarded-for": "192.0.2.0",
      "x-forwarded-port": "443",
      "x-forwarded-proto": "https",
    },
    queryStringParameters: {},
    requestContext: {
      accountId: "123456789012",
      apiId: "abcdefghij",
      domainName: "api.example.com",
      domainPrefix: "api",
      http: {
        method: "GET",
        path: "/posts",
        protocol: "HTTP/1.1",
        sourceIp: "192.0.2.0",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
      },
      requestId: "c6af9ac6-7b61-11e6-9a41-93e8deadbeef",
      routeKey: "GET /posts",
      stage: "prod",
      time: "03/Feb/2022:15:07:51 +0000",
      timeEpoch: 1643923671595,
    },
    isBase64Encoded: false,
  };
  const sampleContext = {} as any; // WON'T BE USED!

  const handler = produceLambdaHandler((req) =>
    get(req as Parameters<typeof get>[0])
  );

  const response = await handler(sampleEvent, sampleContext, () => {});

  expect(response).toMatchInlineSnapshot();
});
