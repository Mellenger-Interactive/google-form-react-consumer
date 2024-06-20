export interface FormItem {
  label: string
  description: string | null
  type: string
  id: string
  required: boolean
  options?: Option[]
  legend?: Legend
}

export interface Option {
  label: string
  custom?: boolean
}

export interface Legend {
  labelFirst: string
  labelLast: string
}
