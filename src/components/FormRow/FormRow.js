/**
 * @flow
 */

import React from "react";
import styled from "styled-components";
import View from "../View";

const FormRowView = styled(View)`
  margin: 3px;
`;

const FormRow = props => <FormRowView {...props} />;

export default FormRow;
