import { ILoginDto, IOrganizationDto, IResp, IUserDto, IPaginator, IPaginatorDto, ICompetitionGroup, IEntrant, IDto, IEntrantExtra } from "./api_types";

const API_AUTH_REF = "/account/auth";
const API_ENTRANTS_REF = "/vo/cabinets/university/entrants-and-applications/entrants";
// const API_APP_REF = "/vo/cabinets/university/entrants-and-applications/applications";
const API_APPCG_REF = "/vo/cabinets/university/entrants-and-applications/competition-groups";

export class Api {
    /** Проверка залогинен или нет */
    static async get_user(): Promise<IUserDto> {
        return await Api.get("/api/account/user/info", API_AUTH_REF);
    }

    /** Логин пользователя */
    static async login(login: FormDataEntryValue, password: FormDataEntryValue): Promise<ILoginDto> {
        return await Api.post("/api/account/login", API_AUTH_REF, {
            login: login,
            password: password
        });
    }

    /** Список организаций, доступных пользователю для логина */
    static async get_organizations(): Promise<IOrganizationDto> {
        return await Api.get("/api/account/organizations", API_AUTH_REF);
    }

    /** Установить выбранную организацию (иначе не будет работать) */
    static async set_organizations(id: number): Promise<IResp> {
        return await Api.post("/api/account/current-org", API_AUTH_REF, {
            id: id
        });
    }

    static async get_entrants_count(): Promise<IPaginator> {
        let r: IPaginatorDto = await Api.get("/api/vo/entrants/list?page=1&limit=20", API_ENTRANTS_REF);
        return r.paginator;
    }

    static async get_entrants(): Promise<IEntrant[]> {
        console.log('dump entrants...');
        let r = await Api.paginator("/api/vo/entrants/list", API_ENTRANTS_REF, 100); // max
        return r as IEntrant[];
    }

    // static async get_app(): Promise<IApplication[]> {
    //     console.log('dump app...');
    //     let r = await Api.paginator_broken("/api/vo/applications/long-list", API_APP_REF, 100); // max
    //     return r as IApplication[];
    // }

    static async get_appcg_count(): Promise<IPaginator> {
        let r: IPaginatorDto = await Api.get("/api/vo/cg/list?page=1&limit=20", API_APPCG_REF);
        return r.paginator;
    }

    // https://vo-online-test.citis.ru/api/vo/cg/list?page=1&limit=20&search_id_status=1
    static async get_appcg(): Promise<ICompetitionGroup[]> {
        console.log('dump appcg...');
        let r = await Api.paginator("/api/vo/cg/list", API_APPCG_REF, 20); // only
        return r as ICompetitionGroup[];
    }

    static async get_entrant(id: number): Promise<IEntrantExtra> {
        let r: IDto = await Api.get(
            "/api/vo/entrants/" + id + "/info",
            "/vo/cabinets/university/entrants-and-applications/entrants/" + id + "/info/personal"
        );
        if (!r.done) {
            throw new Error(r as any);
        }
        return r.data as IEntrantExtra;
    }

    static async paginator(url: string, ref: string, limit: number): Promise<object[]> {
        let result = [];
        let count_page = 1;
        for (let page = 1; page <= count_page; ++page) {
            const r: IPaginatorDto = await Api.get(url + "?page=" + page + "&limit=" + limit, ref);
            if (!r.done) {
                throw new Error(r as any);
            }
            result.push(...r.data);
            count_page = r.paginator.count_page;
            console.log(result.length + ' of ' + r.paginator.total);
        }
        return result;
    }

    // static async paginator_broken(url: string, ref: string, limit: number): Promise<object[]> {
    //     let result = [];
    //     let count_page = Number.MAX_SAFE_INTEGER;
    //     for (let page = 1; page <= count_page; ++page) {
    //         const r: IPaginatorDto = await Api.get(url + "?page=" + page + "&limit=" + limit, ref);
    //         if (!r.done) {
    //             throw new Error(r as any);
    //         }
    //         result.push(...r.data);
    //         if (r.data.length < limit) {
    //             console.log(result.length + ' of ' + result.length);
    //             break;
    //         }
    //         console.log(result.length + ' of ' + r.paginator.total);
    //     }
    //     return result;
    // }

    static async get(url: string, ref: string): Promise<any> {
        try {
            const response = await fetch(url, {
                "method": "GET",
                "referrer": ref,
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "cache-control": "no-cache",
                    "pragma": "no-cache"
                }
            });
            return await response.json();
        } catch (error) {
            return console.error(error);
        }
    }

    static async post(url: string, ref: string, body: any): Promise<any> {
        try {
            const response = await fetch(url, {
                "method": "POST",
                "body": JSON.stringify(body),
                "referrer": ref,
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    "pragma": "no-cache",
                }
            });
            return await response.json();
        } catch (error) {
            return console.error(error);
        }
    }
}
