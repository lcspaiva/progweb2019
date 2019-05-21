function Heroi(nome, inimigo){   
    var heroi = Object.create(Heroi.prototype)
    heroi.nome = nome
    heroi.inimigo = inimigo

    return heroi
}

Heroi.prototype.quemSouEu = function(){
    console.log("Meu nome é " + this.nome + " e meu principal inimigo é " + this.inimigo)
}

heroi1 = Heroi("batman", "coringa")
heroi1.quemSouEu()