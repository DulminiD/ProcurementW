import firebase from "../../firebase";
const db = firebase.ref("/Sites");

export default class Site {
    siteID;
    siteName;

    getSites(){
        let siteArray = [];
        db.on("value", (items)=>{
            items.forEach((item) => {
                siteArray.push(item.val())
            });
        });
        console.log(siteArray);
        return siteArray;
    }
}
