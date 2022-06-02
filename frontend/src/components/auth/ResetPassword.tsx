import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../APIClients/mutations/AuthMutations";
import AuthContext from "../../contexts/AuthContext";

const ResetPassword = (): React.ReactElement => {
  const { authUser } = useContext(AuthContext);

  const [resetPassword] = useMutation<{ resetPassword: boolean }>(
    RESET_PASSWORD,
  );

  const onResetPasswordClick = async () => {
    await resetPassword({ variables: { email: authUser?.email } });
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={onResetPasswordClick}
    >
      Reset Password
    </button>
  );
};

export default ResetPassword;
