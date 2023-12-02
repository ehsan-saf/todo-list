export class Task {

    constructor(title, 
        description = "No description",
        dueDate = "", priority,
        folderName = "default") {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.isComplete = false;
            this.folderName = folderName;
        }


    toggleComplete() {
        this.isComplete = !this.isComplete;
    }  

}

