import { Api } from "./api";
import { ILoginDto, IOrganization, IResp } from "./api_types";
import { Organizations } from "./models";

export class UI {
    static clear() {
        console.log("UI.clear()");

        document.body.innerHTML = `<h1>ourlk</h1>`;
    }

    static page9999() {
        console.log("UI.page9999()");

        document.body.innerHTML = `
<form>
    <table>
        <tr><td><input type="text" name="login" placeholder="login" autocomplete="username" required></td></tr>
        <tr><td><input type="password" name="password" placeholder="password" autocomplete="current-password" required></td></tr>
        <tr><td><input type="submit" value="Login"></td></tr>
    </table>
</form>`;
        const form = document.getElementsByTagName("form")[0];
        form.onsubmit = (event) => {
            console.log("page9999.onsubmit()");
            event.preventDefault();
            const fd = new FormData(form);
            const login = fd.get("login");
            const password = fd.get("password");
            (async () => {
                let user: ILoginDto = await Api.login(login, password);
                if (user.done) {
                    const count: number = await Organizations.sync();
                    console.log("count = " + count);
                    if (count !== 1) {
                        throw new Error("count !== 1");
                    }

                    let result: IOrganization[] = await Organizations.all();
                    if (result.length !== 1) {
                        throw new Error("count !== 1");
                    }
                    let r: IResp = await Api.set_organizations(result[0].id);
                    if (r.done) {
                        UI.page1();
                    }
                }
            })();
            return false;
        };
    }

    static page1() {
        console.log("UI.page1()");

        document.body.innerHTML = `<h1>ourlk</h1>`;
    }
}

// const API_ENTRANTS_URL = "/api/vo/entrants/list";
// const API_APPLICATIONS_URL = "/api/vo/applications/long-list";
// const API_CG_URL = "/api/vo/cg/list";

// const DB_NAME = "ourLK";
// const DB_ORGANIZATIONS = "organizations";
// const DB_ENTRANTS = "entrants";

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
