export interface FormItemType {
  label: string
  description: string | null
  type: string
  id: string
  required: boolean
  options?: OptionType[]
  legend?: LegendType
}

export interface OptionType {
  label: string
  custom?: boolean
}

export interface LegendType {
  labelFirst: string
  labelLast: string
}
