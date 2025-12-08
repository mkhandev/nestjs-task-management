import { TaskStatus } from 'src/tasks/task-status.enum';

export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
