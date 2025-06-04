import { Api } from "./api";
import { ILoginDto, IOrganization, IResp } from "./api_types";
import { Entrants, IEntrantDB, Organizations } from "./models";

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

        document.body.innerHTML = `
<link href="https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.min.css" rel="stylesheet">
<link href="https://cdn.datatables.net/columncontrol/1.0.3/css/columnControl.dataTables.min.css" rel="stylesheet">
<style>
div.dt-container {
    width: 100%;
    padding: 0.5rem;
}
</style>
<table id="table" class="display" width="100%"></table>
`;

        (async () => {
            Entrants.sync();
            let result: IEntrantDB[] = await Entrants.all();

            let dataSet: (string | number)[][] = [];
            result.forEach((i) => {
                dataSet.push([
                    i.id,
                    i.id_profile,
                    i.fio,
                    i.gave_approve ? 'Да' : 'Нет',
                    // i.snils,
                ]);
            })

            // https://datatables.net/
            // @ts-ignore
            $('#table').dataTable({
                columns: [
                    { title: 'id' },
                    { title: 'Уникальный идентификатор поступающего' },
                    { title: 'ФИО' },
                    { title: 'Наличие согласия' },
                    // { title: 'snils' },
                ],
                data: dataSet,

                responsive: true,
                stateSave: true,
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/2.3.1/i18n/ru.json',
                },
                ordering: {
                    handler: false,
                    indicators: false
                },
                columnDefs: [
                    {
                        targets: [2,3],
                        columnControl: {
                            target: 0,
                            className: 'dtcc-row_no-bottom-border',
                            content: [
                                'order',
                                [
                                    // 'orderAsc', 'orderDesc',
                                    // 'spacer',
                                    'searchList'
                                ]
                            ]
                        }
                    }
                ],
                columnControl: [
                    {
                        target: 0,
                        className: 'dtcc-row_no-bottom-border',
                        content: [
                            'order',
                            // ['title', 'orderAsc', 'orderDesc']
                        ]
                    },
                    {
                        target: 1,
                        className: 'dtcc-row_no-top-padding',
                        content: ['search']
                    }
                ],
            });
        })();
    }
}
