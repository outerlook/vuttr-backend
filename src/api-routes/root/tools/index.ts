import { ddbEntities } from "src/persistence/dynamoDB/schema/entities";
import { EntityRecord } from "electrodb";
import { DefinedRequest, DefinedResponse } from "src/api-routes/utils/types";
import { toolsService } from "src/persistence/dynamoDB/api/tools";

interface FindManyToolsQueryParams {
  /** May filter by tag if needed */
  tag?: string;
}

type ToolType = EntityRecord<typeof ddbEntities.Tool>;

interface FindManyToolsResponse {
  tools: ToolType[];
}

export const get = async (
  request: DefinedRequest<{ query: FindManyToolsQueryParams }>
): Promise<
  DefinedResponse<{
    status: 200;
    body: FindManyToolsResponse;
  }>
> => {
  const { query } = request;
  const tools = await toolsService.findMany({ tag: query.tag });
  return {
    status: 200,
    body: {
      tools: tools.data,
    },
  };
};

type CreateToolBody = Omit<ToolType, "id">;

interface CreateToolResponse {
  tool: ToolType;
}

export const post = async (
  request: DefinedRequest<{ body: CreateToolBody }>
): Promise<
  DefinedResponse<{
    status: 201;
    body: CreateToolResponse;
  }>
> => {
  const { body } = request;
  const tool = await toolsService.create(body);
  return {
    status: 201,
    body: {
      tool: tool.data,
    },
  };
};
