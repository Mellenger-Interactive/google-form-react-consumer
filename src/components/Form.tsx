import { useForm, SubmitHandler } from "react-hook-form"
import { FormItemType } from "../types/FormTypes";
// import FormItem from "./FormItem";

type Props = {
  formId: string,
  formData: FormItemType[],
};

type Inputs = {
  example: string
  exampleRequired: string
}

function Form({ formId, formData }: Props) {
  const { control, register } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: formId, // unique name for your Field Array
  });

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<Inputs>()
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <>
      {fields.map((field, index) => (
        <input
          key={field.id}
          {...register(`${formId}}.${index}.value`)}
        />
      ))}
    </>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   {/* {formData.map((formItem, formItemIndex) => <FormItem key={formItemIndex} {...formItem} />)} */}
    //   {formData.map((formItem, formItemIndex) => {
    //     const name = String(formItem.id);
    //     return (
    //       <label key={formItemIndex} for={name}>
    //         <input {...register(name)} />

    //       </label>
    //     );
    //   })}

    //   <input type="submit" />
    // </form>
  )
}

export default Form
