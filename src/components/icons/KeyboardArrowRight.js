/**
 * @flow
 */

import React from "react";

type KeyboardArrowRightProps = {
    color?: string
  }

const KeyboardArrowRight = (props: KeyboardArrowRightProps) => (
  <svg
    width={"5"}
    height={"8"}
    viewBox={"0 0 5 8"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M1 1L4 4L1 7"}
      stroke={props.color || "black"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>
);

export default KeyboardArrowRight;
