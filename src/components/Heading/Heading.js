/**
 * @flow
 */

import React from "react";
import View from "../View";
import Text from "../Text";
import Navigator from "../Navigator";
import styled from "styled-components";
import { monthNames } from "../../lib/calendar";

const MonthTitleView = styled(Text)`
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  margin-right: 0.45em;
  ${({ theme }) => `
        color: ${theme.palette.text.main};
    `}
`;

const YearTitleView = styled(Text)`
  font-size: 20px;
  font-weight: 800;
  ${({ theme }) => `
        color: ${theme.palette.text.main};
    `}
`;

const HeadingView = styled(View)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
`;

type HeadingProps = {
  date: Date,
  onPrevPress: () => void,
  onNextPress: () => void,
  onTodayPress: () => void
};

const Heading = (props: HeadingProps) => {
  const { date } = props;
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return (
    <HeadingView>
      <View>
        <MonthTitleView>{monthName}</MonthTitleView>
        <YearTitleView>{year}</YearTitleView>
      </View>
      <Navigator
        onPrevPress={props.onPrevPress}
        onNextPress={props.onNextPress}
        onTodayPress={props.onTodayPress}
      />
    </HeadingView>
  );
};

export default Heading;
