import LoginPage from 'Pages/LoginPage/LoginPage';
import AdminContainer from './MainPage/Admin/AdminContainer/AdminContainer';
import AdminRanking from './MainPage/Admin/AdminRanking/AdminRanking';
import AdminResults from './MainPage/Admin/AdminResults/AdminResults';
import AdminTraining from './MainPage/Admin/AdminTraining/AdminTraining';
import UserContainer from './MainPage/User/UserContainer/UserContainer';
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
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ],

  authPages: [
    {
      path: '/user',
      element: <UserContainer />,
      roles: [ROLE.User],
      subPages: [
        {
          path: '/user/ranking/:season?/:trainings?',
          element: <UserRanking />,
        },
        {
          path: '/user/results/:id?/:season?',
          element: <UserResults />,
        },
      ],
    },
    {
      path: '/admin/',
      element: <AdminContainer />,
      roles: [ROLE.Admin],
      subPages: [
        {
          path: '/admin/ranking/:season?/:trainings?',
          element: <AdminRanking />,
        },
        {
          path: '/admin/results/:id?/:season?',
          element: <AdminResults />,
        },
        {
          path: '/admin/training',
          element: <AdminTraining />,
        },
      ],
    },

    // {
    //   path: '/user/ranking',
    //   element: <UserRanking />,
    //   roles: [ROLE.User],
    // },
    // {
    //   path: '/user/results',
    //   element: <UserResults />,
    //   roles: [ROLE.User],
    // },
    // {
    //   path: '/admin/ranking',
    //   element: <AdminRanking />,
    //   roles: [ROLE.Admin],
    // },
    // {
    //   path: '/admin/training',
    //   element: <AdminTraining />,
    //   roles: [ROLE.Admin],
    // },
    // {
    //   path: '/admin/results',
    //   element: <AdminResults />,
    //   roles: [ROLE.Admin],
    // },
  ],
};
export default pages;
