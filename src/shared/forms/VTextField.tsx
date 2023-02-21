import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

// O tipo personalizado receberá todas as propriedades de TextFieldProps e adicionará a(s) especificada(s) entre chaves.
type TVTextFieldProps = TextFieldProps & {
  name: string;
}
export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_ref, newValue) => setValue(newValue)
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}

      error={error !== undefined}
      helperText={error}
      defaultValue={defaultValue}

      value={value}
      // Passando as duas funções, através do rest (resto das propriedades) é possível acessar o onChange fora do componente
      onChange={event => { setValue(event.target.value); rest.onChange?.(event); }}

      onKeyDown={(event) => { error && clearError(); rest.onKeyDown?.(event); }}
    />
  );
};