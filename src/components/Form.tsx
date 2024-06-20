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

          {formItem.type == 'LONG_ANSWER' && (
            <textarea
              id={formItem.id}
              {...register(formItem.id, { required: formItem.required })}
            ></textarea>
          )}

          {formItem.type == 'SHORT_ANSWER' && (
            <input
              id={formItem.id}
              {...register(formItem.id, { required: formItem.required })}
            />
          )}

          {formItem.type == 'DROPDOWN' && (
            <select
              id={formItem.id}
              {...register(formItem.id, { required: formItem.required })}
            >
              {!formItem.required && <option value="">- Choose an option -</option>}
              {formItem.options?.map((option, optionIndex) => (
                <option
                  key={optionIndex}
                  value={option.label}
                >
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {(formItem.type == 'RADIO' || formItem.type == 'LINEAR') && (
            <>
              {formItem.options?.map((option, optionIndex) => {

                return(
                  <Fragment key={optionIndex}>
                    {option.label != '' && <label htmlFor={`${formItem.id}[${option.label}]`}>
                      <input
                          {...(optionIndex == 0 && formItem.required ? { defaultChecked: 'checked' } : {})}
                          id={`${formItem.id}[${option.label}]`}
                          type="radio"
                          name={formItem.id}
                          value={option.label}
                      />
                      {option.label}
                    </label>}
                  </Fragment>
                )
              })}
            </>
          )}
        </p>
      ))}
    {/* {errors.email && <span>{errors.email.message}</span>} */}
    <button type="submit">Submit</button>
    </form>
  );
}

export default Form
