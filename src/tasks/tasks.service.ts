import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { GetTaskFilterDto } from 'src/tasks/dto/get-task-filter.dto';
import { TaskStatus } from 'src/tasks/task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @Inject('MyCustomTasksRepository')
    private tasksRepository: ReturnType<Repository<Task>['extend']> & {
      createTask(dto: CreateTaskDto): Promise<Task>;
      getTaskById(id: string): Promise<Task>;
      deleteTask(id: string): Promise<void>;
      updateTask(id: string, dto: UpdateTaskDto): Promise<Task>;
      getTasks(filter?: {
        status?: TaskStatus;
        search?: string;
      }): Promise<Task[]>;
    },
  ) {}

  async getTasks(filter?: {
    status?: TaskStatus;
    search?: string;
  }): Promise<Task[]> {
    return this.tasksRepository.getTasks(filter);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.createTask(createTaskDto);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      return await this.tasksRepository.getTaskById(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async deleteTask(id: string): Promise<void> {
    return await this.tasksRepository.deleteTask(id);
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    try {
      return await this.tasksRepository.updateTask(id, dto);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
