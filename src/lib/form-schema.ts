import { z } from 'zod';

// Input field types
const inputField = z.object({
  _type: z.literal('input'),
  category: z.enum(['currency', 'mask', 'number']).optional(),
  mask: z.string().optional(),
  format: z.object({
    type: z.enum(['integer', 'decimal']),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
  }).optional(),
  value: z.union([z.string(), z.number()]),
});

// Dialog field type
const dialogField = z.object({
  _type: z.literal('dialog'),
  _id: z.string(),
  value: z.string(),
  endpoint: z.string(),
});

// Table row type
const tableRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  startDate: z.date(),
});

// Table field type
const tableField = z.object({
  _type: z.literal('table'),
  data: z.array(tableRowSchema),
});

// Example form schema
export const userFormSchema = z.object({
  general: z.object({
    _type: z.literal('tab'),
    _title: z.literal('General Information'),
    _description: z.literal('Basic user details'),
    name: inputField.extend({
      category: z.literal('mask'),
      mask: z.literal('^[A-Za-z ]*$'),
    }),
    email: inputField.extend({
      category: z.literal('mask'),
      mask: z.literal('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    }),
    phone: inputField.extend({
      category: z.literal('mask'),
      mask: z.literal('(999) 999-9999'),
    }),
  }),
  financial: z.object({
    _type: z.literal('tab'),
    _title: z.literal('Financial Details'),
    _description: z.literal('Salary and budget information'),
    salary: inputField.extend({
      category: z.literal('currency'),
    }),
    budget: inputField.extend({
      category: z.literal('number'),
      format: z.object({
        type: z.literal('decimal'),
        prefix: z.literal('$'),
      }),
    }),
  }),
  projects: z.object({
    _type: z.literal('tab'),
    _title: z.literal('Project Assignment'),
    _description: z.literal('Manage project assignments'),
    supervisor: dialogField,
    assignedProjects: tableField,
  }),
});

export type UserFormData = z.infer<typeof userFormSchema>;