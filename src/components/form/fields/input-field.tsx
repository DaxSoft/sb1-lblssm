import { useId } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

interface InputFieldProps {
  form: UseFormReturn<any>;
  name: string;
  field: any;
}

export function InputField({ form, name, field }: InputFieldProps) {
  const id = useId();
  const category = field.category?.value;
  const mask = field.mask?.value;
  const format = field.format?.value;

  const renderInput = (field: any) => {
    switch (category) {
      case 'currency':
        return (
          <NumericFormat
            id={id}
            customInput={Input}
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            value={field.value}
            onValueChange={({ floatValue }) => {
              field.onChange(floatValue);
            }}
            className={cn(
              'fluent-input',
              field.error && 'border-red-500'
            )}
          />
        );

      case 'number':
        return (
          <NumericFormat
            id={id}
            customInput={Input}
            thousandSeparator
            decimalScale={format?.type === 'decimal' ? 2 : 0}
            prefix={format?.prefix}
            suffix={format?.suffix}
            value={field.value}
            onValueChange={({ floatValue }) => {
              field.onChange(floatValue);
            }}
            className={cn(
              'fluent-input',
              field.error && 'border-red-500'
            )}
          />
        );

      case 'mask':
        return (
          <Input
            id={id}
            {...field}
            className={cn(
              'fluent-input',
              field.error && 'border-red-500'
            )}
            // Add mask implementation here if needed
          />
        );

      default:
        return (
          <Input
            id={id}
            {...field}
            className={cn(
              'fluent-input',
              field.error && 'border-red-500'
            )}
          />
        );
    }
  };

  return (
    <FormField
      control={form.control}
      name={`${name}.value`}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id}>
            {name.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()}
          </FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}