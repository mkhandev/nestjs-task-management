import { DeleteResult, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

export const TasksRepository = {
  async createTask(
    this: Repository<Task>,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  },

  async getTaskById(this: Repository<Task>, id: string): Promise<Task> {
    const found = await this.findOne({ where: { id } });
    if (!found) throw new Error(`Task with ID "${id}" not found`);
    return found;
  },

  async deleteTask(this: Repository<Task>, id: string): Promise<void> {
    const result: DeleteResult = await this.delete(id);

    if (result.affected === 0) {
      throw new Error('Task not found');
    }
  },

  async updateTask(
    this: Repository<Task>,
    id: string,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOne({ where: { id } });
    if (!task) throw new Error(`Task with ID "${id}" not found`);

    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.status !== undefined) task.status = dto.status;

    return this.save(task);
  },

  async getTasks(
    this: Repository<Task>,
    filter?: { status?: TaskStatus; search?: string },
  ): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    if (filter?.status) {
      query.andWhere('task.status = :status', { status: filter.status });
    }

    if (filter?.search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${filter.search}%` },
      );
    }

    return query.getMany();
  },
};
