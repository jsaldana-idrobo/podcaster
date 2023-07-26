import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
} from "react";

interface AppContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultContext: AppContextProps = {
  loading: false,
  setLoading: () => {},
};

const AppContext = createContext<AppContextProps>(defaultContext);

interface AppProviderProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const AppProvider = ({ loading, setLoading, children }: AppProviderProps) => {
  const contextValue = useMemo(
    () => ({ loading, setLoading }),
    [loading, setLoading]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
