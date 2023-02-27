import {
  CognitoUserAttribute,
  CognitoUserPool,
  ISignUpResult,
} from "amazon-cognito-identity-js";
import AWS from "aws-sdk";
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

  const signupResults = await new Promise<ISignUpResult>((resolve, reject) => {
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err || !result) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });

  await confirmUser(email);

  return signupResults;
};

/**
 * This is a workaround for the fact that Cognito doesn't allow
 * us to create a user with a confirmed email.
 */
const confirmUser = async (email: string) => {
  const cognito = new AWS.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18",
    region: "sa-east-1",
  });
  const { AWS_COGNITO_CLIENT_ID, AWS_COGNITO_USER_POOL_ID } =
    getEnvironmentVariablesOrThrowMissing(
      "AWS_COGNITO_USER_POOL_ID",
      "AWS_COGNITO_CLIENT_ID"
    );

  const params = {
    ClientId: AWS_COGNITO_CLIENT_ID,
  };
  const res = cognito.adminConfirmSignUp({
    UserPoolId: AWS_COGNITO_USER_POOL_ID,
    Username: email,
  });

  return new Promise<AWS.CognitoIdentityServiceProvider.AdminConfirmSignUpResponse>(
    (resolve, reject) => {
      res.send((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }
  );
};
