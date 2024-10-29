import { useId } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TableFieldProps {
  form: UseFormReturn<any>;
  name: string;
  field: any;
}

export function TableField({ form, name, field }: TableFieldProps) {
  const id = useId();
  const [editingRow, setEditingRow] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      cell: ({ row }: any) => {
        const date = row.getValue('startDate');
        return date instanceof Date ? date.toLocaleDateString() : date;
      },
    },
    {
      id: 'actions',
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditingRow(row.original);
              setIsDialogOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteRow(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleAddRow = () => {
    setEditingRow({
      id: crypto.randomUUID(),
      name: '',
      role: '',
      startDate: new Date(),
    });
    setIsDialogOpen(true);
  };

  const handleSaveRow = (rowData: any) => {
    const currentData = form.getValues(`${name}.data`) || [];
    const index = currentData.findIndex((row: any) => row.id === rowData.id);

    if (index === -1) {
      // Add new row
      form.setValue(`${name}.data`, [...currentData, rowData]);
    } else {
      // Update existing row
      const newData = [...currentData];
      newData[index] = rowData;
      form.setValue(`${name}.data`, newData);
    }

    setIsDialogOpen(false);
    setEditingRow(null);
  };

  const handleDeleteRow = (id: string) => {
    const currentData = form.getValues(`${name}.data`) || [];
    form.setValue(
      `${name}.data`,
      currentData.filter((row: any) => row.id !== id)
    );
  };

  return (
    <FormField
      control={form.control}
      name={`${name}.data`}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel htmlFor={id}>
            {name.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()}
          </FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleAddRow}
                  className="fluent-button"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Row
                </Button>
              </div>
              <DataTable
                columns={columns}
                data={formField.value || []}
              />
            </div>
          </FormControl>
          <FormMessage />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="fluent-glass sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingRow?.name ? 'Edit Row' : 'Add Row'}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Name</Label>
                  <Input
                    className="fluent-input"
                    value={editingRow?.name || ''}
                    onChange={(e) =>
                      setEditingRow({ ...editingRow, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Select
                    value={editingRow?.role || ''}
                    onValueChange={(value) =>
                      setEditingRow({ ...editingRow, role: value })
                    }
                  >
                    <SelectTrigger className="fluent-input">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="fluent-glass">
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="fluent-button-secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => handleSaveRow(editingRow)}
                  className="fluent-button"
                >
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </FormItem>
      )}
    />
  );
}