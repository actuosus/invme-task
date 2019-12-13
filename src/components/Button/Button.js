/**
 * @flow
 */

import * as React from "react";
import View from "../View";
import styled from "styled-components";
import { type Theme } from "../../types/Theme";

const ButtonView = styled(View)`
  cursor: pointer;
  user-select: none;

  ${({ theme, color, size }) => `
        color: ${
          color === "primary"
            ? theme.palette.primary.main
            : theme.palette.secondary.main
        };

        font-size: ${
          size === "small" ? "8px" : size === "medium" ? "10px" : "14px"
        }
    `}
`;

type ButtonProps = {
  theme: Theme,
  color?: "primary" | "secondary",
  size?: "small" | "medium" | "large",
  onPress?: () => void,
  children: React.Node
};

const Button = ({ onPress, children, ...props }: ButtonProps) => {
  return (
    <ButtonView onPress={onPress} role={"button"} {...props}>
      {children}
    </ButtonView>
  );
};

Button.defaultProps = {
  color: "primary",
  size: "medium"
};

export default Button;
