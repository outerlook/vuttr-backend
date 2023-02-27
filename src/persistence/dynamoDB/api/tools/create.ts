import { CreateEntityItem } from "electrodb";
import { client, VuttrService } from "src/persistence/dynamoDB/schema/entities";
import { nanoid } from "nanoid";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";

export const create = async (
  params: Omit<
    CreateEntityItem<typeof VuttrService.entities.tool>,
    "tag" | "toolId"
  > & {
    tags?: string[];
  }
) => {
  const toolId = nanoid();
  const toolParams = VuttrService.entities.tool
    .create({
      createdBy: params.createdBy,
      title: params.title,
      link: params.link,
      description: params.description,
      toolId,
      tags: params.tags,
    })
    .params<DocumentClient.PutItemInput>();
  const tagParams =
    params.tags?.map((tag) =>
      VuttrService.entities.toolTag
        .create({ tag: tag, toolId })
        .params<DocumentClient.PutItemInput>()
    ) ?? [];

  const allInputs = [toolParams, ...tagParams];

  const results = await client
    .transactWrite({
      TransactItems: allInputs.map((input) => ({ Put: input })),
    })
    .promise();
  return results.$response.data;
};
