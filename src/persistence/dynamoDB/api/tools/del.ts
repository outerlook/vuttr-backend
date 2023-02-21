import { ddbEntities } from "src/persistence/dynamoDB/schema/entities";

export const del = async (params: { id: string }) => {
  const { id } = params;

  const response = await ddbEntities.Tool.delete({ id: id }).go();
  return response;
};
