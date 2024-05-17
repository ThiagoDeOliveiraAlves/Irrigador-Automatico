class BombaDaAgua{
    potencia;
    vazao;
    status;
    historico;
    //historico deve ser uma lista do tipo tempo

    construtor(potencia, vazao){
        this.potencia = potencia;
        this.vazao = vazao;
    }

    ligarBomba(){
        this.status = true;
    }

    desligarBomba(){
        this.status = false;
    }
}