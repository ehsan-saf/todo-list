function newFolder(name, tasks, orderIndex) {
    return {
        name: name,
        tasks: tasks,
        orderIndex: orderIndex,

        addTask(task) {
            this.tasks.push(task);
        },

        removeTask(task) {
            this.tasks = this.tasks.filter(ts => ts.id !== task.id);
        }
    };
} 
