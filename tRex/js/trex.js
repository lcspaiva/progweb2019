(function () {

    const FPS = 300;
    const PROB_NUVEM = 1;
    const PROB_PTRO = 1;
    const PROB_CACTO = 1;
    var gameLoop;
    var deserto;
    var dino;
    var ptero1;
    var ptero2;
    var nuvens = [];
    var cacto1;
    var cacto2;
    var cont = 0;

    if (cont == 0){
        deserto = new Deserto();
        dino = new Dino();
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
        ptero2 = new Ptero();
        ptero2.element.style.right = "520px"
        
        cacto1 = new Cacto("cactoSoloMini");
        cacto1.element.style.right = "500px"
        cacto2 = new Cacto("cactoSoloMini");
        cacto2.element.style.right = "500px"
        gameLoop = setInterval(run, 1000/FPS);
    }



    window.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp" && dino.status==0) dino.status = 1;
        else if(e.key == "ArrowDown" && dino.status==0) dino.status = 3;
    });
    window.addEventListener("keyup", function(e){
        if (e.key == "ArrowDown" && dino.status == 3) dino.status = 0;
        dino.element.style.width = "45px"
    });

    function Deserto () {
        this.element = document.createElement("div");
        this.element.className = "deserto";
        document.body.appendChild(this.element);

        this.chao = document.createElement("div");
        this.chao.className = "chao";
        this.chao.style.backgroundPositionX = "0px";
        this.element.appendChild(this.chao);
    }

    Deserto.prototype.mover = function() {
        this.chao.style.backgroundPositionX = (parseInt(this.chao.style.backgroundPositionX) - 1) + "px";
    }

    function Dino () {
        this.sprites = {
            'correr1':'-766px',
            'correr2':'-810px',
            'pulando':'-678px',
            'agachado1': '-941px',
            'agachado2': '-1000px'

        };
        this.status = 0; // 0:correndo; 1:subindo; 2: descendo; 3: agachado; 4: morto?
        this.alturaMaxima = "80px";
        this.element = document.createElement("div");
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.sprites.correr1;
        this.element.style.bottom = "0px";
        deserto.element.appendChild(this.element);
    }   
    
    Dino.prototype.correr = function () {
        if (this.status == 0) {
            this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.correr1)?this.sprites.correr2:this.sprites.correr1;
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
            }
            else{ //se ja estiver agaixado, anda agaixado
                this.element.style.backgroundPositionX = (this.element.style.backgroundPositionX == this.sprites.agachado1)?this.sprites.agachado2:this.sprites.agachado1;
            }
        }
    }

    function Nuvem () {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "-30px"; //480px termina
        this.element.style.top = (25 + Math.floor(Math.random()*50)) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
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
            this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";        
            if (this.element.style.backgroundPositionX == this.sprites.voa1){
               this.element.style.backgroundPositionX = this.sprites.voa2
               this.element.style.height = "30px"
               this.element.style.backgroundPositionY = "-2px"
            }
            else {
                this.element.style.backgroundPositionX = this.sprites.voa1
                this.element.style.height = "45px"
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
        this.element.style.right = (parseInt(this.element.style.right) + 1) + "px";
    }

    altura = ["80px", "40px", "10px", "80px", "40px", "10px", "80px", "40px", "10px", "80px"]
    tipoCacto = ["cactoSoloMini", "cactoSoloGrande", "cactoDuploGrande", "cactoDuploMini", "cactoTriploMini", "cacto4",
                "cactoSoloMini", "cactoSoloGrande", "cactoDuploGrande", "cactoDuploMini"]

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
            }/*
            else if (parseInt(ptero2.element.style.right) > 500){
                if (ptero2.element.style.right > 500){
                    ptero2.element.style.top =  altura[Math.floor(Math.random()*10)]
                    ptero2.element.style.right = "-30px"
                    deserto.element.appendChild(ptero2)
                }
            }*/
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
        //ptero2.voar()
        cacto1.mover()
        cacto2.mover()
        
        //Em caso de game over
        //clearInterval(gameLoop);
    }
    //init();
})();