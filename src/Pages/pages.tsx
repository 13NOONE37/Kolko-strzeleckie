import LoginPage from 'Pages/LoginPage/LoginPage';
import AdminRanking from './MainPage/Admin/AdminRanking/AdminRanking';
import AdminResults from './MainPage/Admin/AdminResults/AdminResults';
import AdminTraining from './MainPage/Admin/AdminTraining/AdminTraining';
import UserRanking from './MainPage/User/UserRanking/UserRanking';
import UserResults from './MainPage/User/userResults/UserResults';
import { ROLE } from './roles';
export interface pageType {
  path: string;
  element: JSX.Element;
  subPages?: pageType[];
}
export interface pageRoleType extends pageType {
  roles: ROLE[];
}
const pages: {
  guestPages: pageType[];
  authPages: pageRoleType[];
} = {
  guestPages: [
    {
      path: '/login',
      element: <LoginPage />,
    },
  ],

  authPages: [
    {
      path: '/user/ranking',
      element: <UserRanking />,
      roles: [ROLE.User],
    },
    {
      path: '/user/results',
      element: <UserResults />,
      roles: [ROLE.User],
    },
    {
      path: '/admin/ranking',
      element: <AdminRanking />,
      roles: [ROLE.Admin],
    },
    {
      path: '/admin/training',
      element: <AdminTraining />,
      roles: [ROLE.Admin],
    },
    {
      path: '/admin/results',
      element: <AdminResults />,
      roles: [ROLE.Admin],
    },
  ],
};
export default pages;
