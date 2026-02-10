export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    URGENT = 'urgent',
}

export function getTaskPriorityValues(): string[] {
    return Object.values(TaskPriority);
}