import { useEffect, useState } from 'react'
import Form from './components/Form';
import { FormItemType } from './types/FormTypes';

type Props = {
  formId: string,
  successMessage: string,
};

function App({ formId, successMessage }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormItemType[]>([]);

  useEffect(() => {
    const fetchFormData = async () => {
      await fetch(`http://localhost:3000/get-form/${formId}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setFormData(res);
          setIsLoading(false);
        });
    }
    fetchFormData();
  }, [setIsLoading, formId]);

  return (
    <>
      {isLoading && <>Loading...</>}
      {formData.length ? <Form formId={formId} formData={formData} successMessage={successMessage} /> : ''}
    </>
  )
}

export default App
