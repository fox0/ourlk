import { Api } from "./api";
import { ILoginDto, IOrganization, IResp } from "./api_types";
import { CompetitionGroups, Entrants, Organizations } from "./models";

export class UI {
    static clear() {
        console.log("UI.clear()");

        document.body.innerHTML = `<h1>ourlk</h1>`;
        document.title = "ourlk";
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
        document.title = "[:9999]";

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
        document.title = "[:1]";

        Entrants.sync();
        // CompetitionGroups.sync();
    }
}
