export enum TaskStatusEnum {
    EMPTY = "-",
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export const getTaskStatusValues = (): string[] => {
    return Object.values(TaskStatusEnum);
};