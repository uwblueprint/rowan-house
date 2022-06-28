import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import AutocompleteInput from "../common/AutocompleteInput";
import { SearchUsersBarProps } from "../../types/AdminDashboardTypes";
import { UserResponse } from "../../APIClients/types/UserClientTypes";
import { GET_USER_BY_EMAIL } from "../../APIClients/queries/UserQueries";

const SearchUsersBar = ({
  onUserSelect,
}: SearchUsersBarProps): React.ReactElement => {
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [getSearchResult, { loading, data }] = useLazyQuery<{
    user: UserResponse;
  }>(GET_USER_BY_EMAIL, { fetchPolicy: "cache-and-network" });

  const getNoResultMessage = () => (loading ? "Loading..." : "No user found");

  const handleOnSelectUser = () => {
    if (!data) return false;
    const { user } = data;

    onUserSelect({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      town: user.town,
      role: user.role,
      email: user.email,
    });

    return true;
  };

  return (
    <AutocompleteInput
      query={searchEmail}
      onChange={(value: string) => {
        setSearchEmail(value);
        getSearchResult({ variables: { email: value } });
      }}
      onSelect={handleOnSelectUser}
      options={data ? [`${data.user.firstName} ${data.user.lastName}`] : []}
      defaultOption={getNoResultMessage()}
    />
  );
};

export default SearchUsersBar;
