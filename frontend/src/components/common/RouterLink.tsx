import React from "react";
import { Link, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import {
  Link as RouterDOMLink,
  LinkProps as RouterDOMLinkProps,
} from "react-router-dom";

type RouterLinkProps = ChakraLinkProps & RouterDOMLinkProps;

export const StyledRouterLink = (
  props: RouterLinkProps,
): React.ReactElement => <Link as={RouterDOMLink} {...props} />;
const UnstyledRouterLink = (props: RouterLinkProps): React.ReactElement => (
  <StyledRouterLink
    _hover={{ textDecoration: "none", color: "text.default" }}
    {...props}
  />
);

export default UnstyledRouterLink;
