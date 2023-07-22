import { useState } from "react";

interface FormValues {
  [key: string]: string;
}

type HandleInputChange = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

type Reset = (state: FormValues) => void;

type UseForm = (
  initialState: FormValues
) => [FormValues, HandleInputChange, Reset];

export const useForm: UseForm = (initialState = {}) => {
  const [values, setValues] = useState<FormValues>(initialState);

  const reset: Reset = (state = initialState) => {
    setValues(state);
  };

  const handleInputChange: HandleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};
