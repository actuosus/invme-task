import React from "react";

type PointingArrowLeftProps = {
    className?: string,
    color: string
}

const PointingArrowLeft = (props: PointingArrowLeftProps) => {
  return (
    <svg
      width={"6.93"}
      height={"3.465"}
      viewBox={"0 0 6.93 3.465"}
      fill={"none"}
      xmlns={"http://www.w3.org/2000/svg"}
      className={props.className}
    >
      <path
        d={"M1 1L4 4L1 7"}
        fill={props.color}
      />
    </svg>
  );
};

export default PointingArrowLeft;
