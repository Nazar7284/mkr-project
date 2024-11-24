export interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  deadline: string;
  isCompleted: boolean;
  category: "work" | "personal" | "health" | "other";
  createdAt: string;
  goal?: string;
}

export interface IGoal {
  _id: string;
  title: string;
  description: string;
  tasks: ITask[];
  progress: number;
  createdAt: string;
  user: string;
}

export interface IDaily {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export type TaskOrGoal = (ITask | IGoal) & { type: "task" | "goal" };
export type EveryTask = (ITask | IGoal | IDaily) & {
  type: "task" | "goal" | "daily";
};
