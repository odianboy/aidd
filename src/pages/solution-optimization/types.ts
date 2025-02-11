export type DragStateType = {
  sourceId?: string;
  targetId?: string;
};

export type SolutionOptimizationType = {
  id: string;
  name: string;
  image: string;
  isDisabled: boolean;
};

export type VideoSolutionOptimizationType = {
  [key: string]: string;
};
