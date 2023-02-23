import { DefinedRequest, DefinedResponse } from "src/api-routes/utils/types";
import { signUpUser } from "src/persistence/cognito/signUp";
import { login } from "src/persistence/cognito/login";

interface SignupResponse {
  token: string;
}

interface SignupBody {
  email: string;
  password: string;
}

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
    const { user } = await signUpUser({ password: password, email: email });
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
