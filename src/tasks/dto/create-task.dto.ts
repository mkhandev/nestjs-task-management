import { TaskStatus } from 'src/tasks/task-status.enum';

export class CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
