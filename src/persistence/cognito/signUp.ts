import {
  CognitoUserAttribute,
  CognitoUserPool,
  ISignUpResult,
} from "amazon-cognito-identity-js";
import { getEnvironmentVariablesOrThrowMissing } from "src/utils/get-environment-variables";

export const signUpUser = async ({
  password,
  email,
}: {
  password: string;
  email: string;
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

  const attributeList = [
    new CognitoUserAttribute({
      Name: "email",
      Value: email,
    }),
  ];

  const signupResults = new Promise<ISignUpResult>((resolve, reject) => {
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err || !result) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
  return signupResults;
};
