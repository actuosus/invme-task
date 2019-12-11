/**
 * @flow
 */

import React from "react";
import View from "../View";
import styled from "styled-components";

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
          size === 'small'
            ? '8px'
            : size === 'medium'
              ? '10px'
              : '14px'
        }
    `}
`;

type ButtonProps = {
  color?: "primary" | "secondary",
  size?: "small" | "medium" | "large",
  onPress?: () => void,
  children: React.ReactNode
};

const Button = ({ onPress, children, ...props }: ButtonProps) => {
  return (
    <ButtonView onClick={onPress} {...props}>
      {children}
    </ButtonView>
  );
};

Button.defaultProps = {
  color: "primary",
  size: "medium",
};

export default Button;
