import React from "react";

interface HeaderItemProps {
  label: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({ label }) => {
  return (
    <div className="cursor-pointer hover:text-gray-300 transition-all">
      {label}
    </div>
  );
};

export default HeaderItem;
