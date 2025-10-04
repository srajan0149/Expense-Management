export interface User {
  id: number;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
}

export const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "pending" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "approved" },
];
