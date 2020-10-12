/**
 * @flow
 */

import * as React from "react";
import View from "../View";
import styled from "styled-components";
import { type Theme } from "../../types/Theme";

type ButtonProps = {
  theme: Theme,
  color?: "primary" | "secondary",
  size?: "small" | "medium" | "large",
  onPress?: (event: SyntheticEvent<any>) => void,
  children: React.Node
};

const ButtonView: React.ComponentType<ButtonProps> = styled(View)`
  cursor: pointer;
  user-select: none;

  ${({ theme, color, size }: ButtonProps) => `
        color: ${
          color === "secondary"
            ? theme.palette.secondary.main
            : theme.palette.primary.main
        };

        font-size: ${
          size === "small" ? "8px" : size === "medium" ? "10px" : "14px"
        }
    `}
`;

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
