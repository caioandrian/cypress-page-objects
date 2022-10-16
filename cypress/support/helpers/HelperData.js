class HelperData {

    static retornarDataAtual(){
        var data = new Date();
        return data.getFullYear() + "-" + data.getMonth() +  "-" + data.getDate()
    }

    static retornarDataFutura(dias = 1, meses = 1, anos = 0){
        var data = new Date();
        return (data.getFullYear() + anos) + "-" + (data.getMonth() + meses) +  "-" + (data.getDate() + dias)
    }

    static retornaDateTimeFormatado(formato = "en-US", operador=undefined, dias=undefined, meses=undefined, anos=undefined){
        var data = new Date();

        switch (operador) {
            case "+":
                if(dias)
                    data.setDate(data.getDate() + dias)
                if(meses)
                    data.setMonth(data.getMonth() + meses)
                if(anos)
                    data.setFullYear(data.getFullYear() + anos)
                break;

            case "-":
                if(dias)
                    data.setDate(data.getDate() - dias)
                if(meses)
                    data.setMonth(data.getMonth() - meses)
                if(anos)
                    data.setFullYear(data.getFullYear() - anos)
                break;

            default:
                break;
        }

        return data.toISOString(formato)
    }

}

export default HelperData;
