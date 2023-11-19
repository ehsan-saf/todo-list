import {initialize , addTask} from "./domScripts/dom";
import { Task } from "./task";

initialize();

let task1 = new Task("Ab exercise", "do 30 jumping jacks", 
"1402 / 8 / 27", "3", "workouts");
addTask(task1);

const folders = [];