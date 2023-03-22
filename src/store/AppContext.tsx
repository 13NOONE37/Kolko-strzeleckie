import { ROLE } from 'Pages/roles';
import { createContext } from 'react';

export interface UserType {
  role: ROLE;
  firstName: string;
  secondName: string;
}
export interface contextType {
  isLogged: boolean | null;
  setIsLogged: (a: any) => void;
  user: UserType | null;
  setUser: (a: any) => void;
}
const AppContext = createContext<contextType>({
  isLogged: null,
  setIsLogged: () => {},
  user: null,
  setUser: () => {},
});
export default AppContext;
