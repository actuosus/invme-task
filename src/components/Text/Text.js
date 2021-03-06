/**
 * @flow
 */

import * as React from "react";

type TextProps = {
  className?: string,
  children?: string,
  style?: any
};

const Text = (props: TextProps) => {
return <span className={props.className} style={props.style}>{props.children}</span>;
};

export default Text;
