import { FormItemType } from "../types/FormTypes";

function FormItem(props: FormItemType) {

  return (
    <>
      <p>
        {JSON.stringify(props)}
      </p>
      <label for={String(props.id)}>

      </label>
    </>
  )
}

export default FormItem
