## Description

From a configuration file and a set of API routes, generate an OpenAPI spec.

```json
// routes-config.json
[
  {
    "filepath": "/home/.../src/api-routes/root/tools/index.ts",
    "uriPath": "/tools",
    "method": "post",
    "functionName": "post"
  }
]
```

```ts
// /home/.../src/api-routes/root/tools/index.ts
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
```

Generates:

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API",
    "version": "1.0.0"
  },
  "paths": {
    "/tools": {
      "post": {
        "tags": ["tools"],
        "summary": "Create a tool",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateToolBody"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateToolResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "CreateToolBody": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "link": {
            "type": "string"
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": ["name", "link", "tags"]
      },
      "CreateToolResponse": {
        "type": "object",
        "properties": {
          "tool": {
            "$ref": "#/components/schemas/ToolType"
          }
        },
        "required": ["tool"]
      },
      "ToolType": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "link": {
            "type": "string"
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": ["id", "name", "link", "tags"]
      }
    }
  }
}
```

## Responsible for

- Generating the OpenAPI spec from files

## NOT Responsible for

- Defining the API's request and response types

## Depends on

- [/src/api-routes](/src/api-routes/readme.md)
