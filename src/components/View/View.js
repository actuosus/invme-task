/**
 * @flow
 */

import React from "react";

type ViewProps = {
  component?: React.ReactNode,
  onPress?: () => void
};

const View = ({ component, onPress, ...props }: ViewProps) => {
  return <div onClick={onPress} {...props} />;
};

export default View;
