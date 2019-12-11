/**
 * @flow
 */

import React from "react";
import View from "../View";
import styled, { withTheme } from "styled-components";
import Button from "../Button";
import KeyboardArrowLeft from "../icons/KeyboardArrowLeft";
import KeyboardArrowRight from "../icons/KeyboardArrowRight";

const NavigatorView = styled(View)`
  display: flex;
  flex-direction: row;
`;

const NavigatorButton = styled(Button)`
  padding: 3px 7px;
  font-size: 11px;

  ${({ theme }) => `
        color: ${theme.palette.text.main};
    `}
`;

type NavigatorProps = {
  onPrevPress?: () => void,
  onTodayPress?: () => void,
  onNextPress?: () => void
};

const Navigator = (props: NavigatorProps) => {
  return (
    <NavigatorView>
      <NavigatorButton onPress={props.onPrevPress}>
        <KeyboardArrowLeft color={props.theme.palette.text.main} />
      </NavigatorButton>
      <NavigatorButton onPress={props.onTodayPress}>Today</NavigatorButton>
      <NavigatorButton onPress={props.onNextPress}>
        <KeyboardArrowRight color={props.theme.palette.text.main} />
      </NavigatorButton>
    </NavigatorView>
  );
};

export default withTheme(Navigator);
