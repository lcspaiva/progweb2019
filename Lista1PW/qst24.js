function Heroi(nome, inimigo){   
    this.nome = nome
    this.inimigo = inimigo
}
Heroi.prototype.quemSouEu = function(){
    console.log("Meu nome é " + this.nome + " e meu principal inimigo é " + this.inimigo)
}

heroi1 = new Heroi("Batman", "Coringa")
heroi1.quemSouEu()