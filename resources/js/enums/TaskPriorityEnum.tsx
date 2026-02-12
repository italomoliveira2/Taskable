export enum TaskPriorityEnum {
    EMPTY = "-",
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    URGENT = 'urgent',
}

export function getTaskPriorityValues(): string[] {
    return Object.values(TaskPriorityEnum);
}