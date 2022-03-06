import React from "react";

const SideBar = ({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement => {
  return <div>{children}</div>;
};

export default SideBar;
