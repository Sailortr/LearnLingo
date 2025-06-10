import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/**
 * react-hook-form ve yupResolver kullanarak form kurulumunu basitleştiren bir custom hook.
 * * @param {object} validationSchema - Yup doğrulama şeması.
 * @param {object} [defaultValues={}] - Form için varsayılan değerler.
 * @param {string} [mode='onSubmit'] 

 */
export const useFormValidation = (
  validationSchema,
  defaultValues = {},
  mode = "onSubmit"
) => {
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode, // 'onChange', 'onBlur', 'onSubmit', 'onTouched', 'all'
  });

  return {
    ...formMethods,
    // Buraya özel yardımcı fonksiyonlar veya ek state'ler eklenebilir
    // Örneğin: isSubmitting state'i, resetForm gibi...
    // Ancak react-hook-form zaten formState.isSubmitting gibi özellikler sunar.
  };
};

// Kullanım Örneği:
// import * as yup from 'yup';
// const schema = yup.object().shape({ name: yup.string().required() });
// const MyFormComponent = () => {
//   const { register, handleSubmit, formState: { errors } } = useFormValidation(schema);
//   const onSubmit = data => console.log(data);
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register('name')} />
//       {errors.name && <p>{errors.name.message}</p>}
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
