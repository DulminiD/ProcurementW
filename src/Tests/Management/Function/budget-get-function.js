
import Management from "../../../Management/Modal/management";
let management = new Management();

export function getBudget() {
    let obj = [];
    obj = management.getBudget();
    return obj;
}
