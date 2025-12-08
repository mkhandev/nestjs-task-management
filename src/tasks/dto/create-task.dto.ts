import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/tasks/task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
