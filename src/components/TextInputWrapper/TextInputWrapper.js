import React from 'react';
import { TextInput } from 'react-native';
import { textInputStyles } from './TextInputWrapperStyles';

const TextInputWrapper = ({ style, placeholder, ...rest },) => {
  return (
    <TextInput
      style={[textInputStyles.input, style]}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default TextInputWrapper;
