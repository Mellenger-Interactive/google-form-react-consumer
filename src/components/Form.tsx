import { useForm, SubmitHandler } from "react-hook-form"
import { FormItemType } from "../types/FormTypes";
import { Fragment } from "react/jsx-runtime";
// import FormItem from "./FormItem";

type Props = {
  formId: string,
  formData: FormItemType[],
};

function Form({ formId, formData }: Props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((formItem, formItemIndex) => (
        <p key={formItemIndex}>
          <label htmlFor={formItem.id}>
            {formItem.label}
            {formItem.required && '*'}
          </label>

          {
            {
              'LONG_ANSWER':
                <textarea
                  id={formItem.id}
                  {...register(formItem.id)}
                ></textarea>,
              'SHORT_ANSWER':
                <input
                  id={formItem.id}
                  {...register(formItem.id)}
                />,
              'DROPDOWN':
                <select
                  id={formItem.id}
                  {...register(formItem.id)}
                >
                  {formItem.options?.map((option, optionIndex) => (
                    <option value={option.label} key={optionIndex}>{option.label}</option>
                  ))}
                </select>,
              'RADIO':
                <>
                  {formItem.options?.map((option, optionIndex) => (
                    <label htmlFor={`${formItem.id}[${option.label}]`} key={optionIndex}>
                      <input
                          id={`${formItem.id}[${option.label}]`}
                          type="radio"
                          name={formItem.id}
                          value={option.label}
                      />
                      {option.label}
                    </label>
                  ))}
                </>,
              'LINEAR':
                <input
                  id={formItem.id}
                  type="range"
                  {...register(formItem.id)}
                  // min={Number([...formItem.options][0].label)}
                  // max={Number([...formItem.options][-1].label)}
                />,
            }[formItem.type]
          }

          {/* {formItem.type == "LONG_ANSWER" &&
            <textarea
              id={formItem.id}
              name={formItem.id}
            ></textarea>
          }
          {formItem.type == "SHORT_ANSWER" &&
            <input
              id={formItem.id}
              name={formItem.id}
              // ref={register({ required: true })}
            />
          }
          {form} */}
        </p>
      ))}
    {/* {errors.email && <span>{errors.email.message}</span>} */}
    <button type="submit">Submit</button>
    </form>
  );

  // const { control, register } = useForm();
  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
  //   control, // control props comes from useForm (optional: if you are using FormProvider)
  //   name: formId, // unique name for your Field Array
  // });

  // // const {
  // //   register,
  // //   handleSubmit,
  // //   watch,
  // //   formState: { errors },
  // // } = useForm<Inputs>()
  // // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  // return (
  //   <>
  //     {fields.map((field, index) => (
  //       <input
  //         key={field.id}
  //         {...register(`${formId}}.${index}.value`)}
  //       />
  //     ))}
  //   </>
  //   // <form onSubmit={handleSubmit(onSubmit)}>
  //   //   {/* {formData.map((formItem, formItemIndex) => <FormItem key={formItemIndex} {...formItem} />)} */}
  //   //   {formData.map((formItem, formItemIndex) => {
  //   //     const name = String(formItem.id);
  //   //     return (
  //   //       <label key={formItemIndex} for={name}>
  //   //         <input {...register(name)} />

  //   //       </label>
  //   //     );
  //   //   })}

  //   //   <input type="submit" />
  //   // </form>
  // )
}

export default Form
