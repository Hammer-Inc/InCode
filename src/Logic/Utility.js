const MAX_TITLE_LENGTH = 50;

function toTitle(str) {
    if(str.length < MAX_TITLE_LENGTH)
        return str;
    if(str.indexOf(".") > MAX_TITLE_LENGTH){
        let temp = str.slice(0,MAX_TITLE_LENGTH - 3);
        temp.concat("...");
        return temp;
    }else{
        return str.slice(0,str.indexOf("."));
    }
}

function getStatusClass(status){
    switch(status){
        case "pending":
            return "success";
        case "in progress":
            return "warning";
        case "resolved":
        case "unresolved":
            return "danger";
        default:
            return "default";


    }
}

function priorityToString(priority){
    switch (priority){
        case 0:
            return "low";
        case 1:
            return "medium";
        case 2:
            return "high";
        default:
            return "error";
    }
}

export default null;
export {toTitle, getStatusClass, priorityToString, MAX_TITLE_LENGTH};