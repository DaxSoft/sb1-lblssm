import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(['admin', 'user', 'manager']),
  department: z.string(),
  status: z.enum(['active', 'inactive', 'pending']),
  joinDate: z.date(),
  projects: z.array(z.string()).optional(),
});

export type User = z.infer<typeof userSchema>;

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    department: 'Engineering',
    status: 'active',
    joinDate: new Date('2023-01-15'),
    projects: ['Project A', 'Project B'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'manager',
    department: 'Sales',
    status: 'active',
    joinDate: new Date('2023-02-20'),
    projects: ['Project C'],
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'user',
    department: 'Marketing',
    status: 'inactive',
    joinDate: new Date('2023-03-10'),
    projects: [],
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'manager',
    department: 'HR',
    status: 'pending',
    joinDate: new Date('2023-04-05'),
    projects: ['Project D'],
  },
  {
    id: '5',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    role: 'user',
    department: 'Engineering',
    status: 'active',
    joinDate: new Date('2023-05-15'),
    projects: ['Project A'],
  },
];