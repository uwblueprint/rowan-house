import React, { useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

import useLogout from "../../hooks/useLogout";

const LogoutButton = (props: ButtonProps): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const logout = useLogout();

  const handleClick = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <Button
      variant="secondary-filled"
      onClick={handleClick}
      isLoading={loading}
      loadingText="Processing..."
      {...props}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
