import { useForm, SubmitHandler } from "react-hook-form"
import { FormItemType } from "../types/FormTypes";
import FormItem from "./FormItem";

type Props = {
  formData: FormItemType[],
};

type Inputs = {
  example: string
  exampleRequired: string
}

function Form({ formData }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {formData.map((formItem, formItemIndex) => <FormItem key={formItemIndex} {...formItem} />)} */}
      {formData.map((formItem, formItemIndex) => {
        const name = String(formItem.id);
        return (
          <label key={formItemIndex} for={name}>
            <input {...register(name)} />

          </label>
        );
      })}

      <input type="submit" />
    </form>
  )
}

export default Form
