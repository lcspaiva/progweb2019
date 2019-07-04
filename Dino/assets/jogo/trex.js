(function () {

    var FPS = 300;
    const PROB_NUVEM = 1;
    const PROB_PTRO = 1;
    const PROB_CACTO = 1;
    var gameLoop;
    var deserto;
    var dino;
    var ptero1;
    var nuvens = [];
    var cacto1;
    var cacto2;
    var cont = 0;
    var pontos = 0
    var frames = 0
    var pausado = false
    var isDay = true
    var velocidade = 1
    var placar
    

    //faz o jogo começar somente quando o cara apertar /\
    if (cont == 0){
        deserto = new Deserto();
        dino = new Dino();
        placar = new Score();
        cont ++;
    }
    window.addEventListener("keydown", function(ev){    
        if(ev.key == "ArrowUp" && cont <= 1){
            init();
        }
        cont ++;
    })

    function init () {
        ptero1 = new Ptero();
        ptero1.element.style.right = "520px"
        
        cacto1 = new Cacto("cactoSoloMini");
        cacto1.element.style.right = "500px"
        cacto2 = new Cacto("cactoSoloMini");
        cacto2.element.style.right = "500px"
        gameLoop = setInterval(run, 1000/FPS);
    }

    //eventos para jogar
    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp" && dino.status==0) dino.status = 1;
        else if(e.key == "ArrowDown" && dino.status==0) dino.status = 3;
        else if(e.key == "P" || e.key == "p"){
            if(pausado == false){
                pausado = true
                clearInterval(gameLoop)
            }else if(pausado == true){
                pausado = false
                gameLoop = setInterval(run, 1000/FPS);
            }
        }
    });
    
    //evento pra faze o dino ficar em pé denovo
    window.addEventListener("keyup", function(e){
        if (e.key == "ArrowDown" && dino.status == 3) dino.status = 0;
        dino.element.style.width = "45px"
    });

    function Score () {
        this.sprites = {
            0:'-484px',
            1:'-494px',
            2:'-504px',
            3:'-514px',
            4:'-524px',
            5:'-534px',
            6:'-544px',
            7:'-554px',
            8:'-564px',
            9:'-574px'
        }
        for (let i = 0; i < 60; i+=12) {
            this.element = document.createElement("div");
            this.element.className = "score";
            this.element.style.backgroundPositionX = this.sprites[0];
            this.element.style.right = i + "px";
            deserto.element.appendChild(this.element); 
        }
        this.placar = document.getElementsByClassName("score");
    }

    Score.prototype.aumentar = function(stringNum){
        pos0 = this.placar.item(4);
        pos1 = this.placar.item(3);
        pos2 = this.placar.item(2);
        pos3 = this.placar.item(1);
        pos4 = this.placar.item(0);

        pos0.style.backgroundPositionX = this.sprites[parseInt(stringNum[0])]
        pos1.style.backgroundPositionX = this.sprites[parseInt(stringNum[1])]
        pos2.style.backgroundPositionX = this.sprites[parseInt(stringNum[2])]
        pos3.style.backgroundPositionX = this.sprites[parseInt(stringNum[3])]
        pos4.style.backgroundPositionX = this.sprites[parseInt(stringNum[4])]
    }

    function Deserto () {
        jogo = document.getElementById('jogo')
        this.element = document.createElement("div");
        this.element.className = "deserto";
        jogo.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";
        this.element.appendChild(this.chao);
    }

    Deserto.prototype.mover = function() {
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - velocidade) + "px";
    }

    function Dino () {
        this.sprites = {
            'correr1':'-766px',
            'correr2':'-810px',
            'pulando':'-678px',
            'agachado1': '-941px',
            'agachado2': '-1000px',
            'dead': "-899px"
        };
        this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado; 4: morto?
        this.alturaMaxima = "110px";
        this.element = document.createElement("div");
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.sprites.correr1;
        this.element.style.bottom = "0px";
        deserto.element.appendChild(this.element);
    }   
    
    Dino.prototype.correr = function () {
        if (this.status == 0) {
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1)?this.sprites.correr2:this.sprites.correr1;
            this.element.style.width = "45px"
            this.element.style.height = "45px"
            //this.element.style.bottom = "0px"
            this.element.style.backgroundPositionY = "-3px"
        }
        else if (this.status == 1) {
            this.element.style.backgroundPositionX = this.sprites.pulando;
            this.element.style.bottom = (parseInt(this.element.style.bottom) + 1) + "px";
            if (this.element.style.bottom == this.alturaMaxima) this.status = 2;
        }
        else if (this.status == 2) {
            this.element.style.bottom = (parseInt(this.element.style.bottom) - 1) + "px";
            if (this.element.style.bottom == "0px") this.status = 0;
        }
        else if(this.status == 3){ //se tiver andando abaixa, se estiver abaixado anda abaixado         
            if (this.element.style.backgroundPositionX == this.sprites.correr1 || this.element.style.backgroundPositionX == this.sprites.correr2){
                this.element.style.backgroundPositionX = this.sprites.agachado1;
                this.element.style.width = "60px"
                this.element.style.height = "30px"
                this.element.style.backgroundPositionY = "-19px"
            }
            else{ //se ja estiver agaixado, anda agaixado
                this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.agachado1)?this.sprites.agachado2:this.sprites.agachado1;
                this.element.style.width = "60px"
                this.element.style.height = "30px"
                this.element.style.backgroundPositionY = "-19px"
                //this.element.style.bottom = "2px"
            }
        }
        else if(this.status == 4){
            this.element.style.backgroundPositionX = this.sprites.dead
            this.element.style.height = "45px"
            this.element.style.width = "45px"
            this.element.style.backgroundPositionY  = "-3px"

            clearInterval(gameLoop);
            gameOver()
        }
    }

    function gameOver(){
        this.element = document.createElement("div");
        this.element.className = "fim";
        deserto.element.appendChild(this.element)

        this.element= document.createElement("div")
        this.element.className = "botao"
        deserto.element.appendChild(this.element)
    }

    function Nuvem () {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "-30px"; //480px termina
        this.element.style.top = (50 + Math.floor(Math.random()*30)) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + velocidade) + "px";
    }

    function Ptero(){
        this.sprites = {
            'voa1': '-134px',
            'voa2': '-180px' //180~225 -2 30 altura
        }
        this.status = 0 //0:baixo 1:cima    
        this.element = document.createElement("div");
        this.element.className = "ptero";
        this.element.style.backgroundPositionX = this.sprites.voa1;
        this.element.style.right = "-30px"; //480px termina
        //this.element.style.top = "0px";
        this.element.style.top =  altura[Math.floor(Math.random()*10)]
        //ptero1.element.style.right = "-30px"
        deserto.element.appendChild(this.element);
    }

    Ptero.prototype.voar = function(){
        if (this.element.style.right > 515){
            ;
        }
        else{
            this.element.style.right = (parseInt(this.element.style.right) + velocidade) + "px";        
            if (this.element.style.backgroundPositionX == this.sprites.voa1){
               this.element.style.backgroundPositionX = this.sprites.voa2
               this.element.style.height = "30px"
               this.element.style.backgroundPositionY = "-2px"
            }
            else {
                this.element.style.backgroundPositionX = this.sprites.voa1
                this.element.style.height = "30px"
                this.element.style.backgroundPositionY = "-8px"
            }
        }
    }

    function Cacto(tipo) { //17x35
        this.element = document.createElement("div");
        this.element.className = tipo;
        this.element.style.right = "-30px"; //480px termina
        //this.element.style.top = "10px";
        deserto.element.appendChild(this.element);
    }

    Cacto.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + velocidade) + "px";
    }

    altura = ["80px", "40px", "10px", "80px", "40px", "10px", "80px", "40px", "10px", "80px"]
    tipoCacto = ["cactoSoloMini", "cactoSoloGrande", "cactoDuploGrande", "cactoDuploMini", "cactoTriploMini", "cacto4",
                "cactoSoloMini", "cactoSoloGrande", "cactoDuploGrande", "cactoDuploMini"]
    

    function formataPonto(pontuação){
        //são 5 casas
        if(pontos < 10){
            return "0000" + pontuação
        }else if(pontos < 100){
            return "000" + pontuação
        }else if(pontos < 1000){
            return "00" + pontuação
        }else if(pontos < 10000){
            return "0" + pontuação
        }else if(pontos < 100000){
            return String(pontuação)
        }else{
            if(pontuação == 100000){
                console.log("GG")
                clearInterval(gameLoop);
            }
            console.log("deu pau")
        }
    }

    function colisao(rect1, rect2, tp){
        //hitbox do elemento A (sempre será o dino)
        quadA = rect1.element.getBoundingClientRect()
        //hitbox do elemento B (serao os elementos que existem no deserto e indicam gameover)
        quadB = rect2.element.getBoundingClientRect()
        var colidiu
        if (tp == 1){
            //caso as hitbox se encontrem nos detectamos uma colisao
            colidiu = (quadA.top <= quadB.bottom && quadA.bottom >= quadB.top) && quadA.right >= quadB.left && quadB.left > 0
        }else if (tp == 2){
            //ainda passa por dentro
            colidiu = (quadA.right >= quadB.left && quadA.bottom >= quadB.top && quadB.left > 0 && quadB.top <= quadA.bottom)
        }
        return colidiu
    }

    function mudaDia() {
            if (isDay == true) {
                deserto.element.style.backgroundColor = 'rgb(255, 255, 255)';             
                isDay = false
            } 
            else {
                deserto.element.style.backgroundColor = 'rgb(0,0,0)'
                isDay = true
            }
    }

    function run () {
        dino.correr();
        deserto.mover();

        if (Math.floor(Math.random()*6500) <= PROB_NUVEM) { //cria nuvem
            nuvens.push(new Nuvem());
        }

        //teremos no máximo 2 ptros ao mesmo tempo na tela
        if(Math.floor(Math.random()*3000) <= PROB_PTRO){
            //console.log("qro criar ptro!")
            //se a posição do ptro for maior que 500 ele está apto a voltar ao deserto
            if (parseInt(ptero1.element.style.right) > 500){
                ptero1 = new Ptero()
            }
        }
        if (Math.floor(Math.random()*10000) <= PROB_NUVEM) { //cria nuvem
            nuvens.push(new Nuvem());
        }
        nuvens.forEach(function (n) {
            n.mover(); //480 é o fim do grid visualmente, max=500px
        });

        if(Math.floor(Math.random()*1000) <= PROB_CACTO){
            var dist1 = parseInt(cacto1.element.style.right)
            var dist2 = parseInt(cacto2.element.style.right)

            if (dist1 < 75 || dist2 < 75){
                ;
            }
            else{
                if(parseInt(cacto1.element.style.right) > 500){
                    cacto1 = new Cacto(tipoCacto[Math.floor(Math.random()*10)])
                }
                else if (parseInt(cacto2.element.style.right) > 500){
                    cacto2 = new Cacto(tipoCacto[Math.floor(Math.random()*10)])
                }
            }
        }
        ptero1.voar()
        cacto1.mover()
        cacto2.mover()
        
        frames ++
        if(frames%30==0){
            pontos ++
        }
        
        //a cada 50 pontos aumenta a velocidade do jogo e muda o cenario
        if(pontos%40==0 && pontos != 0){
            //clearInterval(gameLoop)
            console.log("aumentei speed")
            console.log(pontos)
            velocidade += 0.10
            mudaDia()
            pontos ++
        }

        let pontuação = formataPonto(pontos);
        placar.aumentar(pontuação)
        console.log(pontos)

        if (colisao(dino, ptero1, 1)){
            dino.status = 4
        }
        if (colisao(dino, cacto1, 2)){
            dino.status = 4
        }
        if (colisao(dino, cacto2, 2)){
            dino.status = 4
        }
        
    }
})();