import {initialize , addTasksToPage} from "./domScripts/dom";
import { Task } from "./task";
import { addToTaskArray } from "./folder";
import { loadTasks } from "./domScripts/taskDom";

initialize();

let task1 = new Task("Ab exercise", "do 30 jumping jacks", 
"1402 / 8 / 27", "3", "workouts", 0);

addToTaskArray(task1);
loadTasks();

