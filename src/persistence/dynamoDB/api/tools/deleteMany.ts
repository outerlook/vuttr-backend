import { ddbEntities } from "src/persistence/dynamoDB/schema/entities";
import { findMany } from "src/persistence/dynamoDB/api/tools/findMany";

export const deleteManyById = async (params: { ids: string[] }) => {
  const { ids } = params;

  const query = ddbEntities.Tool.delete(ids.map((id) => ({ id })));
  const results = await query.go();

  return results;
};

export const deleteManyByTag = async (params: { tag: string }) => {
  const { tag } = params;

  const { data: toolsToDelete } = await findMany({ tag });

  const query = ddbEntities.Tool.delete(
    toolsToDelete.map((tool) => ({ id: tool.id }))
  );

  const results = await query.go();

  return results;
};
