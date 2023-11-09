class Task {

    constructor(title, 
        description = "No description",
        dueDate, priority,
        folderName) {
            this.title = title;
            this.description = description;
            this.priority = priority;
            this.dueDate = dueDate;
            this.priority = priority;
            this.isComplete = false;
            this.folderName = folderName;
        }


    toggleComplete() {
        this.isComplete = !this.isComplete;
    }  

}

