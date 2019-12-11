/**
 * @flow
 */

import * as React from "react";

type FormProps = {
  onPress: () => void
};

const Form = React.forwardRef<FormProps, HTMLFormElement>(
  ({ onPress, ...props }, ref) => {
    return <form onClick={onPress} ref={ref} {...props} />;
  }
);

export default Form;
