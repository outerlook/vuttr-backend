import { BaseHandler } from "src/api-routes/utils/types";
import { APIGatewayProxyEventV2, Handler } from "aws-lambda";
import middy from "@middy/core";
import httpResponseSerializer from "@middy/http-response-serializer";
import httpEventNormalizerMiddleware from "@middy/http-event-normalizer";
import httpHeaderNormalizerMiddleware from "@middy/http-header-normalizer";
import httpErrorHandlerMiddleware from "@middy/http-error-handler";
import warmupMiddleware from "@middy/warmup";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";

type ResultBeforeMiddlewares = Omit<
  APIGatewayProxyStructuredResultV2,
  "body"
> & {
  /** The response body is not the same expected from lambda handler, as it is serialized on middlewares */
  body?: { [key: string]: any };
};

/**
 * Produces a lambda handler with the predefined middlewares
 * - Avoids repeating the same middlewares in every lambda handler
 * - Allows to add new middlewares in a single place
 * - Decouples logic from lambda setup
 */
export const produceLambdaHandler = (fn: BaseHandler): Handler => {
  const handler = middy<APIGatewayProxyEventV2, ResultBeforeMiddlewares>(
    async (event, context) => {
      const request = {
        query: event.queryStringParameters,
        headers: event.headers,
        body: event.body ? JSON.parse(event.body) : undefined,
        params: event.pathParameters,
      };
      const response = await fn(request);

      return {
        statusCode: response.status,
        body: response.body,
      };
    }
  );
  return handler
    .use(warmupMiddleware())
    .use(httpEventNormalizerMiddleware())
    .use(httpHeaderNormalizerMiddleware())
    .use(httpErrorHandlerMiddleware())
    .use(
      httpResponseSerializer({
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
          {
            regex: /^text\/plain$/,
            serializer: ({ body }) => body,
          },
        ],
        defaultContentType: "application/json",
      })
    );
};
