import { lambdaAdapter } from "src/build-lambdas/lambda-adapter";
import { BaseHandler } from "src/api-routes/utils/types";

export const handler = lambdaAdapter("TEMPLATE" as any as BaseHandler);
