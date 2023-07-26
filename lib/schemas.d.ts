export interface FormElement {
  name: string;
  required: boolean;
  type: string;
  label: string;
  placeholder: string;
  help: string;
  validation: string;
  width: string | number;
  choices?: { label: string; value: any }[]
  outerclass?: string //not coming from backend.
}