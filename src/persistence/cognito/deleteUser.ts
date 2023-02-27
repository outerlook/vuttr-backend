import { getEnvironmentVariablesOrThrowMissing } from "src/utils/get-environment-variables";
import AWS from "aws-sdk";

/**
 * Test purposes
 */
export const deleteUser = async ({ email }: { email: string }) => {
  const { AWS_COGNITO_CLIENT_ID, AWS_COGNITO_USER_POOL_ID } =
    getEnvironmentVariablesOrThrowMissing(
      "AWS_COGNITO_USER_POOL_ID",
      "AWS_COGNITO_CLIENT_ID"
    );

  const cognito = new AWS.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18",
    region: "sa-east-1",
  });

  return new Promise<{}>((resolve, reject) => {
    cognito.adminDeleteUser(
      {
        UserPoolId: AWS_COGNITO_USER_POOL_ID,
        Username: email,
      },
      (err, result) => {
        if (err || !result) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
};
