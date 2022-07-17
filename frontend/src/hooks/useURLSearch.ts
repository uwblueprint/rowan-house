import { useState } from "react";
import { useHistory } from "react-router-dom";

const IDENTITY = (value: string) => value;

const getSearchParams = () => new URLSearchParams(window.location.search);

const makeURLSearchHook = <T>(
  set: (value: T) => string | null,
  get: (value: string) => T,
  defaultDefaultValue: T,
) => (
  name: string,
  defaultValue: T = defaultDefaultValue,
): [T, (value: T) => void] => {
  const history = useHistory();
  const [search, setSearch] = useState(getSearchParams);
  const setValue = (value: T) => {
    const newValue = set(value);
    const newSearch = getSearchParams();
    if (newSearch.get(name) === newValue) {
      return;
    }

    if (newValue === null) {
      newSearch.delete(name);
    } else {
      newSearch.set(name, newValue);
    }
    history.push(`?${newSearch}`);
    setSearch(newSearch);
  };

  const value = search.get(name);
  return [value !== null ? get(value) : defaultValue, setValue];
};

export const useURLSearchString = makeURLSearchHook(IDENTITY, IDENTITY, "");

export const useURLSearchFlag = makeURLSearchHook(
  (value: boolean) => (value ? "true" : null),
  (value: string) => value === "true",
  false,
);

export const useURLSearchBoolean = makeURLSearchHook(
  String,
  (value: string) => value === "true",
  false,
);
