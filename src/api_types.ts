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
