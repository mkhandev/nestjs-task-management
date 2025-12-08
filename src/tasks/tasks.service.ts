import { GetTaskFilterDto } from 'src/tasks/dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { Task } from 'src/tasks/task.model';
import { v4 as uuid } from 'uuid';
import { stat } from 'fs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  getFilterTask(filterTask: GetTaskFilterDto): Task[] {
    const { status, search } = filterTask;
    let tasks = this.getAllTask();

    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, status } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: status || TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => id !== task.id);
  }

  updateTask(id: string, updateTask: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    const { title, description, status } = updateTask;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    return task;
  }
}
