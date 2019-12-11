import React from "react";

type PointingRhombusProps = {
  className?: string,
  style?: any,
  color?: string,
};

const PointingRhombus = (props: PointingRhombusProps) => {
  return (
    <svg
      width={"12"}
      height={"9"}
      viewBox={"0 0 12 9"}
      fill={"none"}
      xmlns={"http://www.w3.org/2000/svg"}
      className={props.className}
      style={props.style}
    >
      <rect
        width={"6.92752"}
        height={"6.92752"}
        transform={"matrix(0.816577 -0.577236 0.816577 0.577236 0 4.25743)"}
        fill={props.color || "white"}
      />
    </svg>
  );
};

export default PointingRhombus;
