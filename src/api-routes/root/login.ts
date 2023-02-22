import { login } from "src/persistence/cognito/login";
import { DefinedRequest, DefinedResponse } from "src/api-routes/utils/types";

interface LoginResponse {
  token: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const post = async (
  request: DefinedRequest<{ body: LoginBody }>
): Promise<
  | DefinedResponse<{
      status: 200;
      body: LoginResponse;
    }>
  | DefinedResponse<{ status: 401 }>
  | DefinedResponse<{ status: 404 }>
> => {
  const { body } = request;
  const { email, password } = body;
  if (email === "" || password === "") {
    return {
      status: 404,
    };
  }

  try {
    const { getAccessToken } = await login(email, password);
    const token = getAccessToken().getJwtToken();
    return {
      status: 200,
      body: {
        token,
      },
    };
  } catch (e) {
    return {
      status: 401,
    };
  }
};
