export enum Status {
  Pending = 'pending',
  Completed = 'completed',
  Archived = 'archived',
}

export const StatusList = Object.entries(Status).map(([k, v]) => ({
  label: k,
  value: v,
}));

export enum Priority {
  High = 3,
  Medium = 2,
  Low = 1,
  None = 0,
}

export const PriorityColorCode = {
  3: 'red',
  2: 'amber',
  1: 'green',
  0: 'gray',
};

export const PriorityList = Object.entries(Priority)
  .filter(([k, _]) => isNaN(Number(k)))
  .map(([key, value]) => ({
    label: key,
    value,
    color: PriorityColorCode[value as Priority],
  }));

export enum SortBy {
  ASC = 'ascend',
  DESC = 'descend',
}
