import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { getEnvironmentVariablesOrThrowMissing } from "src/utils/get-environment-variables";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { AWS_COGNITO_CLIENT_ID, AWS_COGNITO_USER_POOL_ID } =
    getEnvironmentVariablesOrThrowMissing(
      "AWS_COGNITO_USER_POOL_ID",
      "AWS_COGNITO_CLIENT_ID"
    );

  const userPool = new CognitoUserPool({
    UserPoolId: AWS_COGNITO_USER_POOL_ID,
    ClientId: AWS_COGNITO_CLIENT_ID,
  });

  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise<CognitoUserSession>((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};
