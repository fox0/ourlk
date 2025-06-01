/** /api/account/user/info */
export interface UserInfo {
    done: boolean
    message?: string
    data?: User
}

export interface User {
    id: number
    id_organization?: number
    id_orgtype?: number
    login: string
    name: string
    pass_period: string
    patronymic: string
    registration_date: string
    role: UserRole
    surname: string
}

export interface UserRole {
    code: string
    id: number
    name: string
}
