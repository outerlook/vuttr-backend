import { ddbEntities } from "src/persistence/dynamoDB/schema/entities";

export const findMany = async (params: { tag?: string } = {}) => {
  const { tag } = params;

  const query = ddbEntities.Tool.match({ tags: tag ? [tag] : undefined });
  const results = await query.go();
  
  return results;
};
