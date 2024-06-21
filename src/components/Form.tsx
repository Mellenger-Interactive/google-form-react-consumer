import { useForm } from "react-hook-form"
import { FormItemType } from "../types/FormTypes";
import { useState } from "react";
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

type Props = {
  formId: string,
  formData: FormItemType[],
  successMessage: string,
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

type ParseDataProps = [string, string];

function Form({ formId, formData, successMessage }: Props) {
  const el = 'form-item';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setError] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: object) => {
    setIsSubmitting(true);

    const submitToGoogleForm = async (parsedData: ParseDataProps) => {
      const mappedData = parsedData.map(([key, value]) => {
        return `entry.${key}=${value}`;
      }).join('&');

      fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse?${mappedData}&submit=Submit`, {
        method: "POST",
        mode: "no-cors",
      }).then(res => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setError(false);
      }).catch(res => {
        // TODO: Real error handling
        console.log(res);
        setIsSubmitting(false);
        setError(true);
      });
    };

    const parsedData = Object.entries(data);
    submitToGoogleForm(parsedData);
  }

  return (
    <>
      <SlideDown
        closed={isSubmitted}
        transitionOnAppear={false}
        style={{
          transitionDuration: '0.3s',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={`form form--${isSubmitting ? 'is' : 'not'}-submitting`}>
          {formData.map((formItem, formItemIndex) => {
            const formItemType = getFormElementType(formItem.type);

            return (
              <div className={`${el} ${el}--type-${formItemType}`} key={formItemIndex}>
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
                    type={'text'}
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
                              defaultChecked={optionIndex == 0 && formItem.required}
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

                {errors && errors[formItem.id] && (
                  <p className={`${el}__error`}>
                    {errors[formItem.id].message}
                  </p>
                )}
              </div>
            )
          })}

          <button
            type="submit"
            className={`${el}__button button`}
            disabled={isSubmitting}>
              <span>Submit</span>
          </button>
        </form>
      </SlideDown>
      <SlideDown
        closed={!isSubmitted}
      >
        <div className={`${el}__success`} dangerouslySetInnerHTML={{ __html: successMessage }} />
      </SlideDown>
      <SlideDown
        closed={!isError}
      >
        <div className={`${el}__error`}>
          There was an error with your submission. Please try again.
        </div>
      </SlideDown>
    </>
  );
}

export default Form
