export interface Login {
    email?: string,
    password?: string
}

export interface Register extends Login {
    name?: string, 
    password_confirmation?: string
}