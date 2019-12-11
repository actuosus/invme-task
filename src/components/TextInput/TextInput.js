/**
 * @flow
 */

import React from "react";
import styled from 'styled-components'

const Input = styled.input`
    color: #544747;
    background-color: #F1F8FB;
    appearance: none;
    border: 0;
    border-radius: 4px;
    padding: 3px 5px;
    width: 109px;
    min-height: 17px;
`

const TextArea = styled.textarea`
    color: #544747;
    background-color: #F1F8FB;
    appearance: none;
    border: 0;
    padding: 3px 5px;
    border-radius: 4px;
    width: 109px;
    min-height: 109px;
    min-height: 59px;

    resize: none;
`

type TextInputProps = {
  multiline?: boolean,
  autoFocus?: boolean,
};

const TextInput = ({ multiline, ...props }: TextInputProps) => {
  if (multiline) {
    return <TextArea {...props} />;
  } else {
    return <Input {...props} />;
  }
};

export default TextInput;
