import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

const storeFactory = <T extends {}>() => {
  // Make a context for the store
  const context = createContext<any>(undefined);

  // Make a provider that takes an initialValue
  const Provider = ({
    initialValue,
    children,
  }: {
    initialValue: T;
    children: ReactNode;
  }) => {
    const [state, setState] = useState<T>(initialValue);

    // Memoize the context value to update when the state does
    const contextValue = useMemo<[T, Dispatch<SetStateAction<T>>]>(
      () => [state, setState],
      [state]
    );

    // Provide the store to children
    return <context.Provider value={contextValue}>{children}</context.Provider>;
  };

  // A hook to help consume the store
  const useStore = (): [T, Dispatch<SetStateAction<T>>] => {
    const [state, setState] = useContext(context);

    return [state as T, setState as Dispatch<SetStateAction<T>>];
  };

  return { Provider, useStore };
};

export default storeFactory;
