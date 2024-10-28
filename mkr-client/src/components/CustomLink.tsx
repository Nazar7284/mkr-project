import React from "react";
import { NavLink } from "react-router-dom";

interface CustomLinkProps {
  activeCls?: string;
  nonActiveCls?: string;
  to: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  activeCls = "",
  nonActiveCls = "",
  to,
  children,
}) => {
  return (
    <NavLink
      className={(active) =>
        active.isActive ? `underline ${activeCls}` : `${nonActiveCls}`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default CustomLink;
