export enum TaskPriority {
    EMPTY = " ",
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    URGENT = 'urgent',
}

export function getTaskPriorityValues(): string[] {
    return Object.values(TaskPriority);
}