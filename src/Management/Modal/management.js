import firebase from "../../firebase";
import * as f from "firebase";
const budgetdb = firebase.ref("/budget");
const limitdb = firebase.ref("/limit");

export default class Management {
    budget;
    limit;
    items;
    site;

    setBudget(){
        let budget = {
            budget : this.budget,
            site : this.site
        };
        budgetdb.push(budget)
            .then(() => {
                console.log("Created new budget successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getBudget(){
        let budgetArray = [];
        budgetdb.on("value", (budgets)=>{
            budgets.forEach((budget) => {
                budgetArray.push(budget.val())
            });
        });
        console.log(budgetArray);
        return budgetArray;
    }

    setLimit(){
        f.database().ref('limit/MIwGdpcUND8cGZUXhA4').set({limit: this.limit})
            .then(r  =>{console.log("Created new limit successfully!");})
            .catch((e)=>{
                console.log(e)
            })
    }

    getLimit(){
        let limit = [];
        limitdb.on("value", (items)=>{
            items.forEach((item) => {
                limit.push(item.val())
            });
        });
            console.log(limit)
            return limit;

    }
}
