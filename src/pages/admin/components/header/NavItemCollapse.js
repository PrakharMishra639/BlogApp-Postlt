import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavItemCollapse = ({
  title,
  children,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);

  const handleToggle = () => {
    if (activeNavName === name) {
      // If the same item is clicked again, collapse it
      setActiveNavName(null);
      setIsChecked(false);
    } else {
      // Otherwise, expand the clicked item
      setActiveNavName(name);
      setIsChecked(true);
    }
  };

  return (
    <div className="d-collapse d-collapse-arrow bg-white min-h-0 rounded-none py-2 ">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div
        className={`d-collapse-title font-medium min-h-0 py-0 pl-0 flex items-center gap-x-2 text-lg ${name === activeNavName
          ? "font-bold text-primary"
          : "font-semibold text-[#A5A5A5]"
          }`}
      >
        {icon}
        {title}
      </div>
      <div className="d-collapse-content">
        <div className="mt-2 flex flex-col gap-y-2">
        {children}
        </div>
      </div>
    </div>
  );
};

export default NavItemCollapse;