/** /api/account/user/info */
export interface IUserDto {
    /** залогинен? */
    done: boolean
    /** not null, если done = false */
    message?: string
    /** not null, если done = true */
    data?: IUser
}

export interface IUser {
    id: number
    /** is null если организация не выбрана */
    id_organization?: number
    /** is null если организация не выбрана */
    id_orgtype?: number
    login: string
    name: string
    pass_period: string
    patronymic: string
    registration_date: string
    role: IUserRole
    surname: string
}

export interface IUserRole {
    code: string
    id: number
    name: string
}

/** /api/account/login */
export interface ILoginDto {
    /** залогинен? */
    done: boolean
    /** not null, если done = false */
    message?: string
    /** not null, если done = true */
    data?: ILogin
}

export interface ILogin {
    id: number
    login: string
    surname: string
    name: string
    patronymic: string
    registration_date: string
    email: string
    pass_period: string
    role: IUserRole
}

/** /api/account/organizations */
export interface IOrganizationDto {
    done: boolean
    message: string
    data: IOrganization[]
}

export interface IOrganization {
    id: number
    id_orgtype: number
    id_parent?: number
    kpp: string
    ogrn: string
    full_title: string
    short_title: string
}

/** /api/account/current-org */
export interface IResp {
    done: boolean
    message: string
}

export interface IPaginatorDto {
    done: boolean
    data: object[]
    paginator: IPaginator
}

export interface IPaginator {
    total: number
    count_page: number
    page: number
    offset: number
    limit: number
}

/** /api/vo/entrants/list + IPaginatorDto */
export interface IEntrant {
    id: number
    id_profile: number
    snils?: string
    fio: string
}

// /** /api/vo/applications/long-list + IPaginatorDto */
// export interface IApplication {
//     id: number
//     id_education_level_group: number
//     // здесь нет id абитуриента :(
//     registration_date: string
//     budget: string
//     fio: string
//     short_title: string
//     shown_on_epgu: string
//     snils?: string
//     source: string
//     stage_admission: string
// }

/** /api/vo/cg/list + IPaginatorDto */
export interface ICompetitionGroup {
    /** PK КГ в заявлении */
    id_cg: number
    /** FK заявления? */
    id: number
    id_organization: number
    id_pt: number
    status: string
    comment: string
    education_form: string
    education_level_name: string
    fio: string
    okso: string
    paid_contract_status?: string
    place_type: string
    priority: number
    short_title: string
    snils?: string
    // sport: any
    stage_admission: string
}
