import React from "react";
import PropTypes from "prop-types";

import Label from "./Label";
import Field from "./Field";
import Input from "./Input";
import Box from "./Box";

const InputField = ({
  label,
  name,
  value = "",
  type = "text",
  inputProps = {},
  labelProps = {},
  labelWidth = 1 / 2,
  inputWidth = 1 / 2,
  onChange = null,
  ...fieldProps
}) => {
  return (
    <Field {...fieldProps}>
      <Box width={labelWidth} textAlign="right">
        <Label htmlFor={name} {...labelProps} mr={1}>
          {label}
        </Label>
      </Box>
      <Box width={inputWidth}>
        <Input
          width="100%"
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          {...inputProps}
        />
      </Box>
    </Field>
  );
};

InputField.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  type: PropTypes.string,
  inputWidth: PropTypes.number,
  labelWidth: PropTypes.number,
  inputProps: PropTypes.object,
  labelProps: PropTypes.object
};

export default InputField;
