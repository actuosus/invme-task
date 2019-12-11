/**
 * @flow
 */

import React from "react";

type KeyboardArrowLeftProps = {
  color?: string
}

const KeyboardArrowLeft = (props: KeyboardArrowLeftProps) => (
  <svg
    width={"5"}
    height={"8"}
    viewBox={"0 0 5 8"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <path
      d={"M4 1L1 4L4 7"}
      stroke={props.color || "black"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>
);

export default KeyboardArrowLeft;
