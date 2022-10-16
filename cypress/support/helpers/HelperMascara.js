class HelperMascara {

    static colocar_mascara_cpf(param_cpf){
        let cpf = param_cpf.replace(/\D/g, '')
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
        cpf = cpf.replace(/(\d{3})(\d{1,2})/, '$1-$2')
        cpf = cpf.replace(/(\-d{2})\d+?$/, '$1')
        return cpf
    }

    static retirar_mascara(ObjCPF) {
        return ObjCPF.replace(/\D/g, '');
    }
}

export default HelperMascara;
