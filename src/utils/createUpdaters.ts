export const createObjectUpdater = <T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
) => <K extends keyof T>(key: K, value: T[K]) => {
  setState((prevState) => ({
    ...prevState,
    [key]: value,
  }));
};