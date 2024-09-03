function criptografarSenha(senha:string):string{
    const inverterSenha = senha.split('').reverse().join('');
    const senhaCriptografada = `zz${inverterSenha}yy`

    return senhaCriptografada;
}

export default criptografarSenha