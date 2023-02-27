import { VuttrService } from "src/persistence/dynamoDB/schema/entities";

export const findMany = async (params: { tag?: string } = {}) => {
  const { tag } = params;

  const results = await (tag ? findManyByTag({ tag }) : getAllTools());

  return results;
};

const getAllTools = async () => {
  const { data: tools } = await VuttrService.entities.tool.scan.go({pages: 'all'});

  return tools;
};

const findManyByTag = async (params: { tag: string }) => {
  const { tag } = params;

  const { data: tags } = await VuttrService.entities.toolTag.query
    .byTag({tag})
    .go({pages: 'all'});

  const tools = await Promise.all(
    tags.map(async (tag) => {
      const { data: tool } = await VuttrService.entities.tool.query
        .byId({ toolId: tag.toolId })
        .go({pages: 'all'});
      return tool;
    })
  ).then((tools) => tools.flat());

  return tools;
};
