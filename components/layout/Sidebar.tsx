
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UsersIcon, PackageIcon, ListOrderedIcon } from '../icons/LucideIcons';

const Sidebar: React.FC = () => {
  const navLinkClasses = 'flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors';
  const activeClasses = 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-white';
  const inactiveClasses = 'hover:bg-gray-200 dark:hover:bg-gray-800';

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">Installment Pro</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <HomeIcon className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <UsersIcon className="w-5 h-5 mr-3" />
          Customers
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <PackageIcon className="w-5 h-5 mr-3" />
          Products
        </NavLink>
        <NavLink
          to="/installments"
          className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <ListOrderedIcon className="w-5 h-5 mr-3" />
          Installments
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
