/**
 * @flow
 */

import * as React from "react";

type ViewProps = {
  component?: React.Node,
  onPress?: () => void,
  className?: string,
  children?: React.Node,
  style?: any
};

const View = React.forwardRef<ViewProps, HTMLDivElement>(({ onPress, ...props }, ref) => {
  return (
    <div ref={ref} onClick={onPress} className={props.className} style={props.style}>
      {props.children}
    </div>
  );
});

export default View;
