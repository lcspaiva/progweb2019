// min and max included
function rand(min, max){ 
    return Math.floor(Math.random()*(max-min+1)+min);
}

rodadas = 0
jogadas = ["Papel", "Pedra", "Tesoura"]
while(1){
    console.log("Escolha sua Jogada:");
    console.log("1 - Papel");
    console.log("2 - Pedra");
    console.log("3 - Tesoura");

    var jogadaPL = parseInt(prompt("joga"))
    if (jogadaPL < 1 || jogadaPL > 3){
        console.log("Você Perdeu! A sua pontuação foi de: ", rodadas)
        break
    }//if
    jogadaPL = jogadaPL - 1
    var jogadaPC = rand(0, 2)
    console.log("O computador jogou: ", jogadas[jogadaPC])

    if(jogadaPL == jogadaPC){
        //empate
        console.log("A rodada empatou!")
        continue
    }else if (jogadaPL == 1 && jogadaPC == 2){
        //papel vs pedra
        rodadas ++
        console.log("Você ganhou!")
    }else if(jogadaPL == 2 && jogadaPC == 3){
        //pedra vs tesoura
        rodadas ++
        console.log("Você ganhou!")
    }else if(jogadaPL == 3 && jogadaPC == 1){
        //tesoura vs papel
        rodadas ++
        console.log("Você ganhou!")
    }else{
        console.log("Você perdeu!, a sua pontuação foi de: ", rodadas)
        break
    }
}//while
