import { TaskStatus } from 'src/tasks/task-status.enum';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
