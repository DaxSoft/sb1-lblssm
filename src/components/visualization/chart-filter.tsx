import { useState } from 'react';
import { Table } from '@tanstack/react-table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FilterX } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';

interface ChartFilterProps<TData> {
  table: Table<TData>;
  columns: Array<{ id: string; label: string; type: string }>;
}

export function ChartFilter<TData>({ table, columns }: ChartFilterProps<TData>) {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (columnId: string, value: any) => {
    const newFilters = { ...filters };
    if (value === '' || value === null) {
      delete newFilters[columnId];
    } else {
      newFilters[columnId] = value;
    }
    setFilters(newFilters);
    table.getColumn(columnId)?.setFilterValue(value);
  };

  const clearFilters = () => {
    setFilters({});
    table.getAllColumns().forEach((column) => {
      column.setFilterValue(undefined);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="fluent-button-secondary"
        >
          <FilterX className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {columns.map((column) => (
          <AccordionItem key={column.id} value={column.id}>
            <AccordionTrigger className="text-sm">
              {column.label}
            </AccordionTrigger>
            <AccordionContent>
              {column.type === 'date' ? (
                <DatePicker
                  selected={filters[column.id]}
                  onSelect={(date) => handleFilterChange(column.id, date)}
                />
              ) : column.type === 'number' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label>Min</Label>
                    <Input
                      type="number"
                      value={filters[`${column.id}_min`] || ''}
                      onChange={(e) =>
                        handleFilterChange(
                          `${column.id}_min`,
                          e.target.value
                        )
                      }
                      className="fluent-input"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Max</Label>
                    <Input
                      type="number"
                      value={filters[`${column.id}_max`] || ''}
                      onChange={(e) =>
                        handleFilterChange(
                          `${column.id}_max`,
                          e.target.value
                        )
                      }
                      className="fluent-input"
                    />
                  </div>
                </div>
              ) : (
                <Input
                  value={filters[column.id] || ''}
                  onChange={(e) =>
                    handleFilterChange(column.id, e.target.value)
                  }
                  className="fluent-input"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}