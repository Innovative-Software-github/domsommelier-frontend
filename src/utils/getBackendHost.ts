export const isBrowser = typeof window !== "undefined";

export const isServer = !isBrowser;

export const getBackendHost = (): string => {
  const host = isServer
    ? global.process.env.BROWSER_BACKEND_SERVER
    : window.process?.env.BROWSER_BACKEND_SERVER;

  return host ?? "";
};
