import firebase from "../../firebase";
import * as f from "firebase";
import User from "../../User/user";

const budgetdb = firebase.ref("/budget");
const limitdb = firebase.ref("/limit");

export default class Management extends User{
    budget;
    limit;
    items;
    site;

    /*
    The budget details set from the service class are sent to the database
     */
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

    /*
    Budget details are retreived from the database
     */
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

    /*
    The limit details set from the service class are sent to the database
     */
    setLimit(){
        f.database().ref('limit/MIwGdpcUND8cGZUXhA4').set({limit: this.limit})
            .then(r  =>{console.log("Created new limit successfully!");})
            .catch((e)=>{
                console.log(e)
            })
    }

    /*
    Limit details are retreived from the database
     */
    getLimit(){
        let limit = [];
        limitdb.on("value", (items)=>{
            items.forEach((item) => {
                limit.push(item.val())
            });
        });
            console.log(limit);
            return limit;

    }
}
