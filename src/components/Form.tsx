import { useForm, SubmitHandler } from "react-hook-form"
import { FormItemType } from "../types/FormTypes";
import { Fragment } from "react/jsx-runtime";
// import FormItem from "./FormItem";

type Props = {
  formId: string,
  formData: FormItemType[],
};

const getFormElementType = (initialType:string) => {
  switch(initialType) {
    case "LONG_ANSWER":
      return 'textarea';
    case "DROPDOWN":
      return 'select';
    case "RADIO":
    case "LINEAR":
      return 'radio';
    default:
      return 'text';
  }
}

function Form({ formId, formData }: Props) {
  const el = 'form-item';
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((formItem, formItemIndex) => {
        const formItemType = getFormElementType(formItem.type);

        return (
          <p className={`${el} ${el}--type-${formItemType}`} key={formItemIndex}>
            <label htmlFor={formItem.id} className={`${el}__label`}>
              {formItem.label}
              {formItem.required && '*'}
            </label>

            {formItemType == 'textarea' && (
              <textarea
                id={formItem.id}
                className={`${el}__input`}
                {...register(formItem.id, { required: formItem.required })}
              ></textarea>
            )}

            {formItemType == 'text' && (
              <input
                id={formItem.id}
                className={`${el}__input`}
                {...register(formItem.id, { required: formItem.required })}
              />
            )}

            {formItemType == 'select' && (
              <select
                id={formItem.id}
                className={`${el}__input`}
                {...register(formItem.id, { required: formItem.required })}
              >
                {!formItem.required && <option value="">- Choose an option -</option>}
                {formItem.options?.map((option, optionIndex) => (
                  <option
                    key={optionIndex}
                    value={option.label}
                    className={`${el}__option`}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {(formItemType == 'radio') && (
              <>
                {formItem.options?.map((option, optionIndex) => {

                  return(
                    <div key={optionIndex} className={`${el}__option`}>
                      {option.label != '' && <label htmlFor={`${formItem.id}[${option.label}]`}>
                        <input
                          {...(optionIndex == 0 && formItem.required ? { defaultChecked: 'checked' } : {})}
                          id={`${formItem.id}[${option.label}]`}
                          type="radio"
                          name={formItem.id}
                          value={option.label}
                        />
                        <span className={`${el}__option-label`}>
                          {option.label}
                        </span>
                      </label>}
                    </div>
                  )
                })}
              </>
            )}
          </p>
        )
      })}
      {/* {errors.email && <span>{errors.email.message}</span>} */}
      <button type="submit" className={`${el}__button button`}>Submit</button>
    </form>
  );
}

export default Form
