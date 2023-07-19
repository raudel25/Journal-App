import { useState } from "react";

interface FormValues {
  [key: string]: string;
}

type HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

type Reset = () => void;

type UseForm = (
  initialState: FormValues
) => [FormValues, HandleInputChange, Reset];

export const useForm: UseForm = (initialState = {}) => {
  const [values, setValues] = useState<FormValues>(initialState);

  const reset: Reset = () => {
    setValues(initialState);
  };

  const handleInputChange: HandleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};
