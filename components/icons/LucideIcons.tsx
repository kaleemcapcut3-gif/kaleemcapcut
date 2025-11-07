
import React from 'react';

const createIcon = (path: React.ReactNode) => {
  const IconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {path}
    </svg>
  );
  return IconComponent;
};

export const HomeIcon = createIcon(<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />);
export const UsersIcon = createIcon(<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />);
export const PackageIcon = createIcon(<path d="M12.89 1.453a1 1 0 0 1 1.214 0l7.25 5.8a1 1 0 0 1 .336 1.036l-3.333 10.5a1 1 0 0 1-.94.71H6.583a1 1 0 0 1-.94-.71l-3.333-10.5a1 1 0 0 1 .336-1.036l7.25-5.8Z" /><path d="m6.5 21 5.5-13 5.5 13" /><path d="M22 7.25 12 14.5 2 7.25" />);
export const ListOrderedIcon = createIcon(<line x1="10" x2="21" y1="6" y2="6" /><line x1="10" x2="21" y1="12" y2="12" /><line x1="10" x2="21" y1="18" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />);
export const PlusCircleIcon = createIcon(<circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" />);
export const ChevronDownIcon = createIcon(<path d="m6 9 6 6 6-6" />);
export const SearchIcon = createIcon(<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />);
export const MoreVerticalIcon = createIcon(<circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />);
export const FileTextIcon = createIcon(<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />);
export const CalendarIcon = createIcon(<rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />);
export const DollarSignIcon = createIcon(<line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />);
export const AlertTriangleIcon = createIcon(<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" />);
