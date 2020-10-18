import Site from "../../../Management/Modal/site";

let site = new Site();

export function getSites() {
    let obj = [];
    obj = site.getSites();
    return obj;
}

export function getLength() {
    let length = site.getSites().length;
    return length;
}
