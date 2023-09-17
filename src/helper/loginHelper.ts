export const validate = (login: string, senha: string) => {
    if (typeof login !== 'string' || login.length === 0 || login.length > 200) {
        return false
    }

    if (typeof senha !== 'string' || senha.length < 6 || senha.length > 200) {
        return false
    }

    return true
}