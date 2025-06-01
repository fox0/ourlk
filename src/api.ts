import { UserInfo } from "./api_types";

const API_AUTH_REF = "/account/auth";
const API_ENTRANTS_REF = "/vo/cabinets/university/entrants-and-applications/entrants";
const API_APPLICATIONS_REF = "/vo/cabinets/university/entrants-and-applications/applications";
const API_CG_REF = "/vo/cabinets/university/entrants-and-applications/competition-groups";

export class Api {
    static async is_login(): Promise<boolean> {
        let r: UserInfo = await Api.get("/api/account/user/info", API_AUTH_REF);
        return r.done;
    }

    // static async login(login, password) {
    //     let r = await Api.post("/api/account/login", API_AUTH_REF, {
    //         login: login,
    //         password: password
    //     });
    //     if (!r.done) {
    //         throw new Error(r);
    //     }
    //     return true;
    // }

    // static async get_organizations() {
    //     let r = await Api.get("/api/account/organizations", API_AUTH_REF);
    //     if (!r.done) {
    //         throw new Error(r);
    //     }
    //     return r.data;
    // }

    // static async set_organizations(id) {
    //     let r = await Api.post("/api/account/current-org", API_AUTH_REF, {
    //         id: id
    //     });
    //     if (!r.done) {
    //         throw new Error(r);
    //     }
    //     return true;
    // }

    // static async get_entrants() {
    //     console.log('dump entrants...');
    //     return await Api.paginator(API_ENTRANTS_URL, API_ENTRANTS_REF, 100); // max
    // }

    // /**
    //  * @return {int}
    // */
    // static async get_entrants_count() {
    //     const r = await Api.get2(API_ENTRANTS_URL, API_ENTRANTS_REF, 20, 1); // default
    //     if (!r.done) {
    //         throw new Error(r);
    //     }
    //     return r.paginator.total;
    // }

    // static async get_applications() {
    //     console.log('dump applications...');
    //     return await Api.paginator(API_APPLICATIONS_URL, API_APPLICATIONS_REF, 100); // max
    // }

    // static async get_cg() {
    //     console.log('dump cg...');
    //     return await Api.paginator(API_CG_URL, API_CG_REF, 20); // only
    // }

    // static async paginator(url, ref, limit) {
    //     let result = [];
    //     let count_page = Number.MAX_SAFE_INTEGER;
    //     for (let page = 1; page <= count_page; ++page) {
    //         const r = await Api.get2(url, ref, limit, page);
    //         if (!r.done) {
    //             throw new Error(r);
    //         }
    //         result.push(...r.data);
    //         if (r.paginator.count_page != 0) {
    //             count_page = r.paginator.count_page;
    //         } else if (r.data.length < limit) {
    //             console.log(result.length + ' of ' + result.length);
    //             break;
    //         }
    //         console.log(result.length + ' of ' + r.paginator.total);
    //     }
    //     return result;
    // }

    // static async get2(url, ref, limit, page) {
    //     return await Api.get(url + "?page=" + page + "&limit=" + limit, ref);
    // }

    static async get(url: string, ref: string): Promise<any> {
        return fetch(url, {
            "method": "GET",
            "referrer": ref,
            "headers": {
                "accept": "application/json, text/plain, */*",
                "cache-control": "no-cache",
                "pragma": "no-cache"
            }
        })
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }

    static async post(url: string, ref: string, body: any): Promise<any> {
        return fetch(url, {
            "method": "POST",
            "body": JSON.stringify(body),
            "referrer": ref,
            "headers": {
                "accept": "application/json, text/plain, */*",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
            }
        })
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }
}
