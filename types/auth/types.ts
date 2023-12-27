export interface Login {
    email?: string,
    password?: string
}

export interface Register extends Login {
    name?: string, 
    password_confirmation?: string
}

export interface Session {
    id?: number, 
    email?: string,
    name?: string,
    balance?: number,
    createdAt?: string,
    updatedAt?: string
}