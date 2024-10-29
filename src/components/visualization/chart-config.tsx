import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ChartType } from '@/lib/types/chart-types';

interface ChartConfigProps {
  type: ChartType;
  columns: Array<{ id: string; label: string; type: string }>;
  onConfigChange: (config: any) => void;
}

const baseSchema = z.object({
  title: z.string(),
  showLegend: z.boolean(),
});

const lineBarSchema = baseSchema.extend({
  xAxis: z.string(),
  yAxis: z.string(),
  stack: z.boolean(),
});

const pieSchema = baseSchema.extend({
  valueField: z.string(),
  labelField: z.string(),
});

const scatterSchema = baseSchema.extend({
  xAxis: z.string(),
  yAxis: z.string(),
  sizeField: z.string().optional(),
  colorField: z.string().optional(),
});

const gaugeSchema = baseSchema.extend({
  valueField: z.string(),
  min: z.number(),
  max: z.number(),
});

export function ChartConfig({ type, columns, onConfigChange }: ChartConfigProps) {
  let schema;
  switch (type) {
    case 'line':
    case 'bar':
      schema = lineBarSchema;
      break;
    case 'pie':
      schema = pieSchema;
      break;
    case 'scatter':
      schema = scatterSchema;
      break;
    case 'gauge':
      schema = gaugeSchema;
      break;
    default:
      schema = baseSchema;
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      showLegend: true,
      stack: false,
      min: 0,
      max: 100,
    },
  });

  const numberColumns = columns.filter((col) => col.type === 'number');
  const stringColumns = columns.filter((col) => col.type === 'string');
  const dateColumns = columns.filter((col) => col.type === 'date');

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onConfigChange)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chart Title</FormLabel>
              <FormControl>
                <Input {...field} className="fluent-input" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="showLegend"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Show Legend</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {(type === 'line' || type === 'bar') && (
          <>
            <FormField
              control={form.control}
              name="xAxis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X Axis</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="fluent-input">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="fluent-glass">
                      {[...dateColumns, ...stringColumns].map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yAxis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Y Axis</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="fluent-input">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="fluent-glass">
                      {numberColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stack"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Stack Values</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}

        {type === 'pie' && (
          <>
            <FormField
              control={form.control}
              name="valueField"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value Field</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="fluent-input">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="fluent-glass">
                      {numberColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="labelField"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label Field</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="fluent-input">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="fluent-glass">
                      {stringColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </>
        )}

        {type === 'scatter' && (
          <>
            <FormField
              control={form.control}
              name="xAxis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X Axis</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="fluent-input">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="fluent-glass">
                      {numberColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yAxis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Y Axis</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="fluent-input">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="fluent-glass">
                      {numberColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizeField"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Field (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="fluent-input">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="fluent-glass">
                      {numberColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorField"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Field (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="fluent-input">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="fluent-glass">
                      {stringColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </>
        )}

        {type === 'gauge' && (
          <>
            <FormField
              control={form.control}
              name="valueField"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value Field</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="fluent-input">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="fluent-glass">
                      {numberColumns.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="fluent-input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="fluent-input"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}
      </form>
    </Form>
  );
}