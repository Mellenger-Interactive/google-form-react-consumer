import { FormItem } from "../types/FormTypes";

type Props = {
  formData: FormItem[],
};

function Form({ formData }: Props) {
  return (
    <>
      {formData.length && JSON.stringify(formData)}
    </>
  )
}

export default Form
