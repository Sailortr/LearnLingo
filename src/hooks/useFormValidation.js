import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useFormValidation = (
  validationSchema,
  defaultValues = {},
  mode = "onSubmit"
) => {
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode,
  });

  return {
    ...formMethods,
  };
};
