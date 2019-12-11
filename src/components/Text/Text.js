/**
 * @flow
 */

import React from "react";

type TextProps = {
  className?: String;
  children?: string
};

const Text = (props: TextProps) => {
  return <span className={props.className}>{props.children}</span>;
};

export default Text;
