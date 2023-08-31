import { useState } from "react";
import { TUseFormHookInputValues } from "../../services/types/data";

export function useForm(inputValues: TUseFormHookInputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: any): void => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}