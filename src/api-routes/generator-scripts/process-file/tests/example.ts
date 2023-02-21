import { ddbEntities } from "src/persistence/dynamoDB/schema/entities";
import { EntityRecord } from "electrodb";
import { DefinedRequest, DefinedResponse } from "src/api-routes/utils/types";

interface FindManyToolsQueryParams {
  /** May filter by tag if needed */
  tags?: string[];
}

type ToolType = EntityRecord<typeof ddbEntities.Tool>;

interface FindManyToolsResponse {
  tools: ToolType[];
}

export const get = (request: DefinedRequest<{query: FindManyToolsQueryParams}>): DefinedResponse<{status: 200, body: FindManyToolsResponse}> => {
  const {query} = request
  return {
    status: 200,
    body: {
      tools: []
    }
  }
}


export function post(){

}

function teste() {
  return "teste";
}

const CONSTANT_DECLARATION = "teste"

export default teste;