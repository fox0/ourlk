export class UI {
    static clear() {
        document.body.innerHTML = `<h1>ourlk</h1>`;
    }
}


// const form = document.querySelector("form");
// form?.addEventListener("submit", submitHandler);

// function submitHandler(e: Event) {
//     e.preventDefault();
//     const num1 = document.querySelector("input[name='firstnumber']") as HTMLInputElement;
//     const num2 = document.querySelector("input[name='secondnumber']") as HTMLInputElement;
//     // const result = subtract(Number(num1.value), Number(num2.value));
//     // const resultElement = document.querySelector("p");
//     // if (resultElement) {
//     //   resultElement.textContent = result.toString();
//     // }
// }

// // ==UserScript==
// // @name         ourLK
// // @namespace    http://tampermonkey.net/
// // @version      2025-05-31
// // @description  try to take over the world!
// // @author       You
// // @match        https://vo-online-test.citis.ru/account/auth
// // @grant        none
// // ==/UserScript==
// const API_AUTH_REF = "/account/auth";
// const API_ENTRANTS_REF = "/vo/cabinets/university/entrants-and-applications/entrants";
// const API_APPLICATIONS_REF = "/vo/cabinets/university/entrants-and-applications/applications";
// const API_CG_REF = "/vo/cabinets/university/entrants-and-applications/competition-groups";

// const API_ENTRANTS_URL = "/api/vo/entrants/list";
// const API_APPLICATIONS_URL = "/api/vo/applications/long-list";
// const API_CG_URL = "/api/vo/cg/list";

// const DB_NAME = "ourLK";
// const DB_ORGANIZATIONS = "organizations";
// const DB_ENTRANTS = "entrants";

// let g_db;

// class Api {
//     static async is_login() {
//         let r = await Api.get("/api/account/user/info", API_AUTH_REF);
//         return r.done;
//     }

//     static async login(login, password) {
//         let r = await Api.post("/api/account/login", API_AUTH_REF, {
//             login: login,
//             password: password
//         });
//         if (!r.done) {
//             throw new Error(r);
//         }
//         return true;
//     }

//     static async get_organizations() {
//         let r = await Api.get("/api/account/organizations", API_AUTH_REF);
//         if (!r.done) {
//             throw new Error(r);
//         }
//         return r.data;
//     }

//     static async set_organizations(id) {
//         let r = await Api.post("/api/account/current-org", API_AUTH_REF, {
//             id: id
//         });
//         if (!r.done) {
//             throw new Error(r);
//         }
//         return true;
//     }

//     static async get_entrants() {
//         console.log('dump entrants...');
//         return await Api.paginator(API_ENTRANTS_URL, API_ENTRANTS_REF, 100); // max
//     }

//     /**
//      * @return {int}
//     */
//     static async get_entrants_count() {
//         const r = await Api.get2(API_ENTRANTS_URL, API_ENTRANTS_REF, 20, 1); // default
//         if (!r.done) {
//             throw new Error(r);
//         }
//         return r.paginator.total;
//     }

//     static async get_applications() {
//         console.log('dump applications...');
//         return await Api.paginator(API_APPLICATIONS_URL, API_APPLICATIONS_REF, 100); // max
//     }

//     static async get_cg() {
//         console.log('dump cg...');
//         return await Api.paginator(API_CG_URL, API_CG_REF, 20); // only
//     }

//     static async paginator(url, ref, limit) {
//         let result = [];
//         let count_page = Number.MAX_SAFE_INTEGER;
//         for (let page = 1; page <= count_page; ++page) {
//             const r = await Api.get2(url, ref, limit, page);
//             if (!r.done) {
//                 throw new Error(r);
//             }
//             result.push(...r.data);
//             if (r.paginator.count_page != 0) {
//                 count_page = r.paginator.count_page;
//             } else if (r.data.length < limit) {
//                 console.log(result.length + ' of ' + result.length);
//                 break;
//             }
//             console.log(result.length + ' of ' + r.paginator.total);
//         }
//         return result;
//     }

//     static async get2(url, ref, limit, page) {
//         return await Api.get(url + "?page=" + page + "&limit=" + limit, ref);
//     }

//     static async get(url, ref) {
//         return fetch(url, {
//             "method": "GET",
//             "referrer": ref,
//             "headers": {
//                 "accept": "application/json, text/plain, */*",
//                 "cache-control": "no-cache",
//                 "pragma": "no-cache"
//             }
//         })
//         .then((response) => response.json())
//         .catch((error) => console.error(error));
//     }

//     static async post(url, ref, body) {
//         return fetch(url, {
//             "method": "POST",
//             "body": JSON.stringify(body),
//             "referrer": ref,
//             "headers": {
//                 "accept": "application/json, text/plain, */*",
//                 "cache-control": "no-cache",
//                 "content-type": "application/json",
//                 "pragma": "no-cache",
//             }
//         })
//         .then((response) => response.json())
//         .catch((error) => console.error(error));
//     }
// }

// class DB {
//     static async open() {
//         return new Promise(function(resolve, reject) {
//             console.debug('DB.open()');
//             const request = indexedDB.open(DB_NAME, 1);
//             request.onerror = (event) => {
//                 console.error("Why didn't you allow my web app to use IndexedDB?!");
//             };
//             request.onsuccess = (event) => {
//                 //console.debug('DB() onsuccess');
//                 resolve(event.target.result);
//             };
//             request.onupgradeneeded = (event) => {
//                 console.debug('DB() onupgradeneeded');
//                 const db = event.target.result;
//                 switch(event.oldVersion) {
//                     case 0: {
//                         console.debug('DB() onupgradeneeded 0');
//                         db.createObjectStore(DB_ORGANIZATIONS, {
//                             keyPath: "id",
//                             autoIncrement: false
//                         });
//                         db.createObjectStore(DB_ENTRANTS, {
//                             keyPath: "id",
//                             autoIncrement: false
//                         });
//                         break;
//                     }
//                     default:
//                         throw new Error(event.oldVersion);
//                 }
//             };
//         });
//     }

//     static async get_organizations_count() {
//         return DB.count(DB_ORGANIZATIONS);
//     }

//     static async get_entrants_count() {
//         return DB.count(DB_ENTRANTS);
//     }

//     /**
//      * @return {int}
//     */
//     static async count(s) {
//         return new Promise(function(resolve, reject) {
//             const transaction = g_db.transaction([s], "readonly");
//             const store = transaction.objectStore(s);
//             const request = store.count();
//             request.onsuccess = () => {
//                 resolve(request.result);
//             };
//         });
//     }
// }

// class Organizations {
//     static async sync() {
//         console.debug("Organizations.sync()");
//         const count = await DB.get_organizations_count();
//         console.log("organizations: db=" + count);
//         if (count !== 0) {
//             return;
//         }

//         const result = await Api.get_organizations();

//         const transaction = g_db.transaction([DB_ORGANIZATIONS], "readwrite");
//         transaction.oncomplete = (event) => {
//             console.log("Transaction completed.");
//         };
//         transaction.onerror = (event) => {
//             console.error(event);
//         };
//         const store = transaction.objectStore(DB_ORGANIZATIONS);
//         result.forEach((i) => {
//             const request = store.add(i);
//             request.onsuccess = (event) => {
//                 //console.log(event.target.result);
//             };
//         });
//     }
// }

// class Entrants {
//     static async sync() {
//         console.debug("Entrants.sync()");
//         const count1 = await Api.get_entrants_count();
//         const count2 = await DB.get_entrants_count();
//         console.log("entrants: api=" + count1 + " db=" + count2);
//         if (count1 === count2) {
//             return;
//         }
//         const result = await Api.get_entrants();

//         const transaction = g_db.transaction([DB_ENTRANTS], "readwrite");
//         transaction.oncomplete = (event) => {
//             console.log("Transaction completed.");
//         };
//         transaction.onerror = (event) => {
//             console.error(event);
//         };
//         const store = transaction.objectStore(DB_ENTRANTS);
//         result.forEach((i) => {
//             const request = store.get(i.id);
//             request.onsuccess = (event) => {
//                 if (request.result == undefined) {
//                     const request = store.add(i);
//                     request.onsuccess = (event) => {
//                         //console.log(event.target.result);
//                     };
//                 }
//             };
//         });
//         // transaction.commit();
//     }
// }

// class UI {
//     static page9999() {
//         console.log("UI.page9999");
//         document.body.innerHTML = `
// <form>
//     <table>
//         <tr><td><input type="text" name="login" placeholder="login" autocomplete="username" required></td></tr>
//         <tr><td><input type="password" name="password" placeholder="password" autocomplete="current-password" required></td></tr>
//         <tr><td><input type="submit" value="Login"></td></tr>
//     </table>
// </form>`;
//         const form = document.getElementsByTagName("form")[0];
//         form.onsubmit = (event) => {
//             console.log("onsubmit");
//             event.preventDefault();
//             const fd = new FormData(form);
//             (async () => {
//                 let is_login = await Api.login(fd.get("login"), fd.get("password"));
//                 if (is_login) {
//                     Organizations.sync();
//                     const count = await DB.get_organizations_count();
//                     if (count !== 1) {
//                         throw new Error("count !== 1");
//                     }
//                     const id = 76; // todo
//                     Api.set_organizations(id);
//                     UI.page1();
//                 }
//             })();
//             return false;
//         };
//     }

//     static page1() {
//         console.log("UI.page1");
//         document.body.innerHTML = `<h1>ourLK</h1>`;

//         (async () => {
//             await Entrants.sync();
//         })();
//     }
// }

// (function() {
//     'use strict';
//     console.log("init");
//     //return;

//     //document.getElementsByTagName("app-root")[0].remove();
//     document.body.innerHTML = `<h1>ourLK</h1>`;

//     (async () => {
//         g_db = await DB.open();
//         let is_login = await Api.is_login();
//         if (!is_login) {
//             UI.page9999();
//         } else {
//             UI.page1();
//         }
//     })();
// })();
