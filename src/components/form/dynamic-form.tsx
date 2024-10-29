import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form } from '@/components/ui/form';
import { FormField } from './fields/form-field';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { UserFormData } from '@/lib/form-schema';

interface DynamicFormProps {
  schema: any;
  defaultValues: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => Promise<void>;
}

export function DynamicForm({ schema, defaultValues, onSubmit }: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<UserFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data: UserFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = Object.entries(schema.shape).filter(([_, value]: [string, any]) => 
    value.shape?._type?.value === 'tab'
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Tabs defaultValue={tabs[0]?.[0]} className="w-full">
          <TabsList className="w-full justify-start rounded-lg bg-muted/50 p-1">
            {tabs.map(([key, value]: [string, any]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="rounded-md data-[state=active]:bg-background"
              >
                {value.shape._title.value}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map(([key, value]: [string, any]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              {value.shape._description && (
                <p className="text-sm text-muted-foreground">
                  {value.shape._description.value}
                </p>
              )}
              <div className="grid gap-6">
                {Object.entries(value.shape)
                  .filter(([fieldKey]) => !fieldKey.startsWith('_'))
                  .map(([fieldKey]) => (
                    <FormField
                      key={fieldKey}
                      form={form}
                      name={`${key}.${fieldKey}`}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="fluent-button-secondary"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="fluent-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}