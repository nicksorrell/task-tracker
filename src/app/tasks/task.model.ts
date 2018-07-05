export enum TaskStatus {
    IN_PROGRESS = 'In Progress',
    COMPLETE = 'Complete',
    ON_HOLD = 'On Hold',
    DEFERRED = 'Deferred'
}

export class Task {
    constructor(
        public id: number,
        public priority: number,
        public name: string,
        public description: {
            background: string,
            requirements: string[]
        },
        public status: TaskStatus,
        public dateOpened: string,
        public dateClosed: string,
        public POC: string[]
    ) { }
}
