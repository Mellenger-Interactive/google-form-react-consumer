import { useEffect, useState } from 'react'
import Form from './components/Form';
import { FormItem } from './types/FormTypes';

type Props = {
  formId: string,
};

function App({ formId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormItem[]>([]);

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
      {formData.length ? <Form formData={formData} /> : ''}
    </>
  )
}

export default App
