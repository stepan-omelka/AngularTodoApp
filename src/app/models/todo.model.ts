export interface Todo {
  title:string;
  completed: boolean;
  dueDate: Date;
  priority: "High" | "Low" | "Medium";
}
