function createFolderObj(name, foldersArray) {
    if(validateName(name, foldersArray)) {

    }
} 

function validateName(name, array) {
    if(!array.contains( fl => fl.name === name)) {
        return true;
    }
    else{
        return false;
    }
}