import { useId, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { DataTable } from '@/components/data-table/data-table';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogFieldProps {
  form: UseFormReturn<any>;
  name: string;
  field: any;
}

export function DialogField({ form, name, field }: DialogFieldProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const endpoint = field.endpoint?.value;

  // Mock data - replace with actual API call
  const mockColumns = [
    { 
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }: any) => (
        <Button
          variant="ghost"
          onClick={() => {
            form.setValue(`${name}._id`, row.original.id);
            form.setValue(`${name}.value`, row.original.name);
            setOpen(false);
          }}
        >
          {row.original.id}
        </Button>
      ),
    },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
  ];

  const mockData = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <FormField
      control={form.control}
      name={`${name}.value`}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel htmlFor={id}>
            {name.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()}
          </FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Input
                id={id}
                {...formField}
                readOnly
                className={cn(
                  'fluent-input',
                  formField.error && 'border-red-500'
                )}
              />
            </FormControl>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setOpen(true)}
              className="fluent-button-secondary"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <FormMessage />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="fluent-glass max-w-3xl">
              <DialogHeader>
                <DialogTitle>Select {name.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <DataTable
                  columns={mockColumns}
                  data={mockData}
                />
              </div>
            </DialogContent>
          </Dialog>
        </FormItem>
      )}
    />
  );
}