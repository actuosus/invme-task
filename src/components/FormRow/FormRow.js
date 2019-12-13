/**
 * @flow
 */

import React from "react";
import styled from "styled-components";
import View from "../View";

const FormRowView = styled(View)`
  margin: 3px;
`;

type FormRowProps = {};

const FormRow = (props: FormRowProps) => <FormRowView {...props} />;

export default FormRow;
