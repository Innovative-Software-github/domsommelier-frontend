export function stringifySearchParams<T extends { [key: string]: any }>(
  params: T,
): string {
  return Object.keys(params)
    .reduce((acc: string[], name) => {
      if (!params[name]) {
        return acc;
      }

      const arr = Array.isArray(params[name])
        ? params[name].map(
            (value: string) => `${name}=${encodeURIComponent(value)}`,
          )
        : [`${name}=${encodeURIComponent(params[name])}`];

      return [...acc, ...arr];
    }, [])
    .join('&');
}
