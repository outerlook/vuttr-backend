import { produceLambdaHandler } from "src/build-lambdas/api-integration";
import { BaseHandler } from "src/api-routes/utils/types";

export const handler = produceLambdaHandler("TEMPLATE" as any as BaseHandler);
