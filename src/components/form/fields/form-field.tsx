import { useId } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { InputField } from './input-field';
import { DialogField } from './dialog-field';
import { TableField } from './table-field';

interface FormFieldProps {
  form: UseFormReturn<any>;
  name: string;
}

export function FormField({ form, name }: FormFieldProps) {
  const id = useId();
  const field = form.getValues(name);

  if (!field?._type) {
    return null;
  }

  switch (field._type) {
    case 'input':
      return <InputField form={form} name={name} field={field} />;
    case 'dialog':
      return <DialogField form={form} name={name} field={field} />;
    case 'table':
      return <TableField form={form} name={name} field={field} />;
    default:
      return null;
  }
}