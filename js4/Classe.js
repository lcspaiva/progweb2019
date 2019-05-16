class IntegerSet{
    constructor(tam){
        this.tam = tam
        //inicializando o array que representa o conjunto de valores
        var array = []
        for (var i=0; i<tam; i++){
            array[i] = false
        }
        this.set =  array
    }

    //insere um valor no array do obj
    insere(valor){
        if(valor >= this.tam){
            console.log("valor excede o tamanho")
            return
        }
        this.set[valor] = true
        console.log("valor adicionado")
    }

    //retira um valor do array do obj
    exclui(valor){
        if(valor >= this.tam){
            console.log("valor excede o tamanho")
            return
        }
        this.set[valor] = false
        console.log("valor removido")
    }

    //realizara a uniao entre o set do obj e um outro dado por parametro, o resultado sera retornado
    uniao(Intset2){ //ta bugado, tem que ir até o fim do maior
        var aux = []
        if(Intset2.tam <= this.tam){
            aux = this.set
            //o parametro é menor
            for(var i=0; i<Intset2.tam; i++){
                if(this.set[i] == true || Intset2.set[i] == true){
                    aux[i] = true
                }else{
                    aux[i] = false
                }//else
            }//for
            return aux
        }else{
            //o obj é menor
            aux = Intset2.set
            for(var i=0; i<this.tam; i++){
                if(this.set[i] == true || Intset2.set[i] == true){
                    aux[i] = true
                }else{
                    aux[i] = false
                }//else
            }//for
            return aux
        }      
    }

    intersecção(Intset2){
        //ele ta mudando de true pra false sozinho, sei nao bixo
        console.log("intersecção")
        var aux = []
        console.log(Intset2)
        //obj é o menor tamanho
        if(this.tam <= Intset2.length){
            //iniciando o vetor resposta com o tamanho do maior
            for (var i=0; i<Intset2.length; i++){
                aux[i] = false
            }
            //console.log(aux)
            for(var i=0; i<this.tam; i++){
                if(this.set[i] && Intset2[i]){
                    aux[i] = true
                }
            }
            //console.log(aux)
            return aux
        }else{
            //o parametro é o menor tamanho
            //iniciando o vetor resposta com o tamanho do maior
            for (var i=0; i<this.tam; i++){
                aux[i] = false
            }
            for(var i=0; i<Intset2.length; i++){
                if(this.set[i] && Intset2[i]){
                    aux[i] = true
                }
            }
            return aux
        }
    }

    diferença(Intset2){
        var aux = []
        //o objeto é o A, elemento de a que nao pertence a b
        //o obj é menor, logo só precisamos iterar até o tamanho dele
        if(this.tam < Intset2){
            for (var i=0; i<this.tam; i++){
                if(this.set[i] == true && Intset2[i] == false){
                    aux[i] = true
                }else{
                    aux[i] = false
                }
            }
            console.log(aux)
        }else{
            // o parametro tem tamanho maior, logo iteramos até o tamanho do menor (parametro)
            //e pegamos oq sobrar 
            aux = this.set
            for (var i=0; i<Intset2.tam; i++){
                if(this.set[i] == true && Intset2.set[i] == false){
                    aux[i] = true
                }else{
                    aux[i] = false
                }
            }
            console.log(aux)
        }
    }

    stringer(){
        var str = ""
        //formato: [1] = true, [2] = false, 
        for (var i=0; i<this.tam; i++){
            if(this.set[i] == true){
                str += "[" + i + "] = True, "
            }else{
                str += "[" + i + "] = False, "
            }
        }
        console.log(str)
    }

    /*interseção e diferença de conjuntos ; e
    conversão do conjunto para string. */
}


//conjunto 1 = [0, 1, 2, 3, 4]
//conjunto 2 = [6, 7]
conj1 = new IntegerSet(5)
conj2 = new IntegerSet(8)

/**/
for (var j=0; j<5; j++){
    conj1.insere(j)
}
conj1.stringer()

conj2.insere(4)
conj2.insere(6)
conj2.insere(7)
conj2.stringer()


console.log("Metodos\nUnião:")
var uni = conj1.uniao(conj2)
console.log(uni)

console.log("intersecção")
var inter = conj1.intersecção(conj2.set)
console.log(inter)

console.log("diferença")
conj1.diferença(conj2)


