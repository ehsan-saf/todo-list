
class Task {

    constructor(title, 
        description = "No description",
        dueDate, priority, isComplete) {
            this.title = title;
            this.description = description;
            this.priority = priority;
            this.dueDate = dueDate;
            this.priority = priority;
            this.isComplete = false;
        }


    toggleComplete() {
        this.isComplete = !this.isComplete;
    }  

    
}

