import type routesConfig from "out/routes/routes-config"; // works after build
import { Union } from "ts-toolbelt";

/*
 * This file is intended to separate the configuration of the authorization layer from
 * the actual implementation of the authorization layer and business logic.
 */
type Routes = (typeof routesConfig)[number];

type RouteConfigValues = {
  [K in Routes["uriPath"]]: {
    [M in Union.Select<Routes, { uriPath: K }>["method"]]: boolean;
  };
};

/**
 * True means that the route requires authentication.
 */
const requiredAuthenticationConfig = {
  "/login": {
    post: false,
  },
  "/signup": {
    post: false,
  },
  "/tools": {
    get: true,
    post: true,
  },
  "/tools/:id": {
    delete: true,
  },
} satisfies RouteConfigValues;

export const isAuthenticationRequired = (uriPath: string, method: string) => {
  if (!(uriPath in requiredAuthenticationConfig)) {
    return false;
  }
  const config =
    requiredAuthenticationConfig[
      uriPath as keyof typeof requiredAuthenticationConfig
    ];
  return config[method.toLowerCase() as keyof typeof config] ?? false;
};
