// import { Module } from '@nestjs/common';
// import { TasksController } from './tasks.controller';
// import { TasksService } from './tasks.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TasksRepository } from 'src/tasks/tasks.repository';

// @Module({
//   imports: [TypeOrmModule.forFeature([TasksRepository])],
//   controllers: [TasksController],
//   providers: [TasksService],
// })
// export class TasksModule {}

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])], // <-- only entities here
  controllers: [TasksController],
  //providers: [TasksService],
  providers: [
    TasksService,
    {
      provide: TasksRepository,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(Task).extend(TasksRepository),
      inject: [DataSource],
    },
  ],
})
export class TasksModule {}
