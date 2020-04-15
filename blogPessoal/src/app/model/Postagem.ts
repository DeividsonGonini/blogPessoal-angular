// criando a classe
export class Postagem {

    // criando os atributos da classe
    //os atributos em TS tem que ser tipados
    //os atributos virão da API
    public id: number //sera auto incrementado
    //public é para acessar de qualquer lugar da aplicação
    public titulo: string
    public texto: string
    public data: Date // pegara a data do sistema autimaticamente
}