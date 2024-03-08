import { Dashboard } from '../../app/apps/dashboard/dashboard';
import { Employees } from '../../app/apps/employees/employees';
import { Inventory } from '../../app/apps/inventory/inventory';
import { App } from '../../interfaces/app';

export const installedApps: App[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'gg-clapper-board',
    path: '/',
    component: <Dashboard />,
  },
  {
    id: 'inventory',
    name: 'Inventory',
    icon: 'gg-shopping-bag',
    path: '/inventory',
    component: <Inventory />,
  },
  {
    id: 'employees',
    name: 'Employees',
    icon: 'gg-boy',
    path: '/employees',
    component: <Employees />,
  },
  // {
  //   id: 'Orders',
  //   name: 'Orders',
  //   icon: 'gg-shopping-cart',
  //   path: '/orders',
  //   component: <Orders />,
  // },
];
