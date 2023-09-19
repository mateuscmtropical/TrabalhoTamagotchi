export const validate = (login: string, senha: string, confirmarSenha?: string) => {
    const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

    if (typeof login !== 'string' || login.length === 0 || login.length > 200) {
        return false
    }

    if (typeof senha !== 'string' || senha.length < 6 || senha.length > 200) {
        return false
    }

    if (confirmarSenha && (typeof confirmarSenha !== 'string' || confirmarSenha.length < 6 || confirmarSenha.length > 200)) {
        return false
    }

    return true
}
