import { DefinedRequest, DefinedResponse } from "src/api-routes/utils/types";
import { toolsService } from "src/persistence/dynamoDB/api/tools";


export const del = async (
  request: DefinedRequest<{ params: { id: string } }>
): Promise<
  DefinedResponse<{
    status: 200;
  }>
> => {
  const { id } = request.params;
  await toolsService.del({ id });
  return {
    status: 200,
  };
};
