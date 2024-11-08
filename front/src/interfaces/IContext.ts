export interface AuthProviderProps {
  children: React.ReactNode;
}
export interface AuthContextProps {
  userData: ILoggedUser | null;
  setUserData: (userData: ILoggedUser | null) => void;
}

export interface ILoggedUser {
  token: string;
  email: string;
  name: string
}