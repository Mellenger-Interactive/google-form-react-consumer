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

const getFormElementName = (id:string) => id; //`entry.${id}`;

function Form({ formId, formData }: Props) {
  const el = 'form-item';
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const submitToGoogleForm = async (parsedData) => {
      // const mappedData = parsedData.map(([key, value]) => {
      //   return `entry.${key}=${value}`;
      // }).join('&');
      fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...parsedData,
          submit: "Submit",
        })
      }).then(res => console.log(res.json()));
    };


    const parsedData = {};
    Object.keys(data).forEach((key:string) => {
      parsedData[`entry.${key}`] = data[key];
    });
    submitToGoogleForm(parsedData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((formItem, formItemIndex) => {
        const formItemType = getFormElementType(formItem.type);
        const formItemName = getFormElementName(formItem.id);

        return (
          <div className={`${el} ${el}--type-${formItemType}`} key={formItemIndex}>
            <label htmlFor={formItemName} className={`${el}__label`}>
              {formItem.label}
              {formItem.required && '*'}
            </label>

            {formItemType == 'textarea' && (
              <textarea
                id={formItemName}
                className={`${el}__input`}
                {...register(formItemName, { required: formItem.required })}
              ></textarea>
            )}

            {formItemType == 'text' && (
              <input
                id={formItemName}
                className={`${el}__input`}
                {...register(formItemName, { required: formItem.required })}
              />
            )}

            {formItemType == 'select' && (
              <select
                id={formItemName}
                className={`${el}__input`}
                {...register(formItemName, { required: formItem.required })}
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
                      {option.label != '' && <label htmlFor={`${formItemName}[${option.label}]`}>
                        <input
                          id={`${formItemName}[${option.label}]`}
                          type="radio"
                          name={formItem.id}
                          value={option.label}
                          defaultChecked={optionIndex == 0 && formItem.required}
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
          </div>
        )
      })}
      {/* {errors.email && <span>{errors.email.message}</span>} */}
      <button type="submit" className={`${el}__button button`}>Submit</button>
    </form>
  );
}

export default Form
