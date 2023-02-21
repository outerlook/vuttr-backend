import { DefinedRequest, DefinedResponse } from "src/api-routes/utils/types";
import { signUpUser } from "src/persistence/cognito/signUp";
import { login } from "src/persistence/cognito/login";

const ENDPOINT = "";

interface SignupResponse {
  token: string;
}

interface SignupBody {
  email: string;
  password: string;
}

// @endpoint({ method: "POST", path: ENDPOINT })
// class Signup {
//     @request
//     request(@body body: SignupBody) {}
//
//     @response({ status: 200 })
//     successResponse(@body body: SignupResponse) {}
//
//     @response({ status: 400 })
//     badRequestResponse() {}
//
//     @response({ status: 409 })
//     conflictResponse() {}
// }

export const post = async (
  request: DefinedRequest<{ body: SignupBody }>
): Promise<
  | DefinedResponse<{
  status: 200;
  body: SignupResponse;
}>
  | DefinedResponse<{ status: 400 }>
  | DefinedResponse<{ status: 409 }>
> => {
  const { body } = request;
  const { email, password } = body;
  if (email === "" || password === "") {
    return {
      status: 400
    };
  }

  try {
    const { user } = await signUpUser(password, email);
    const { getAccessToken } = await login(email, password);
    const token = getAccessToken().getJwtToken();
    return {
      status: 200,
      body: {
        token
      }
    };
  } catch (e) {
    return {
      status: 409
    };
  }
};
