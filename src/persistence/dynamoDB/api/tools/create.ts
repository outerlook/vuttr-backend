import { ddbEntities } from "src/persistence/dynamoDB/schema/entities";
import { nanoid } from "nanoid";

export const create = async (params: {
  createdBy: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}) => {
  const generatedID = nanoid();

  return ddbEntities.Tool.create({
    createdBy: params.createdBy,
    id: generatedID,
    title: params.title,
    link: params.link,
    description: params.description,
    tags: params.tags,
  }).go();
};