export interface Task {
  id: string;
  title: string;
  description: string;
  //status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
