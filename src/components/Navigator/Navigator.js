/**
 * @flow
 */

import React from "react";
import View from "../View";
import styled, { withTheme } from "styled-components";
import Button from "../Button";
import KeyboardArrowLeft from "../icons/KeyboardArrowLeft";
import KeyboardArrowRight from "../icons/KeyboardArrowRight";
import { type Theme } from "../../types/Theme";

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
  theme: Theme,
  onPrevPress?: () => void,
  onTodayPress?: () => void,
  onNextPress?: () => void,
  month: number,
  year: number
};

const Navigator = (props: NavigatorProps) => {
  // let prevMonth = props.month - 1
  // let nextMonth = props.month + 1
  // let prevYear = props.year
  // let nextYear = props.year

  // if (prevMonth > 12) {
  //   prevMonth = 1
  //   prevYear += 1
  // }
  // if (prevMonth <= 0) {
  //   prevMonth = 12
  //   prevYear -= 1
  // }

  // if (nextMonth > 12) {
  //   nextMonth = 1
  //   nextYear += 1
  // }
  // if (nextMonth <= 0) {
  //   nextMonth = 12
  //   nextYear -= 1
  // }

  // const prevHref = `?year=${prevYear}&month=${prevMonth}`
  // const nextHref = `?year=${nextYear}&month=${nextMonth}`

  return (
    <NavigatorView>
      <NavigatorButton onPress={props.onPrevPress} theme={props.theme}>
        {/* <Link href={prevHref}> */}
        {/* <a> */}
        <KeyboardArrowLeft color={props.theme.palette.text.main} />
        {/* </a> */}
        {/* </Link> */}
      </NavigatorButton>
      <NavigatorButton onPress={props.onTodayPress} theme={props.theme}>Today</NavigatorButton>
      <NavigatorButton onPress={props.onNextPress} theme={props.theme}>
        {/* <Link href={nextHref}> */}
        {/* <a> */}
        <KeyboardArrowRight color={props.theme.palette.text.main} />
        {/* </a> */}
        {/* </Link> */}
      </NavigatorButton>
    </NavigatorView>
  );
};

export default withTheme(Navigator);
