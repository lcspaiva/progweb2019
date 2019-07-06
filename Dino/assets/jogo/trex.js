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
    
    function init () {
        deserto = new Deserto();
        dino = new Dino();
        placar = new Score();
        
        ptero1 = new Ptero();
        ptero1.element.style.right = "700px"
        
        cacto1 = new Cacto("cactoSoloMini");
        cacto1.element.style.right = "700px"
        
        cacto2 = new Cacto("cactoSoloMini");
        cacto2.element.style.right = "700px"
        //gameLoop = setInterval(run, 1000/FPS);
    }

    document.getElementById("iniciar").addEventListener('click', function (u) {
        dino.status = 0;
        gameLoop = setInterval(run, 1000/FPS);
    }, {once : true});


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
            document.getElementById("gg").addEventListener('click', function(e){
                location.reload();
            });
            //document.getElementById("iniciar").addEventListener('click', function (u)
            
        }
    }

    function gameOver(){
        this.element = document.createElement("div");
        this.element.className = "fim";
        deserto.element.appendChild(this.element)

        this.element = document.createElement("div")
        this.element.className = "botao";
        this.element.id = "gg";
        deserto.element.appendChild(this.element)

        var d = (new Date()).toString().split(' ')
        //var dia = d[2] + " " + d[1] + " " + d[3];

        var today = new Date();
        var dia = today.getDate();
        var mes = today.getMonth()+1; //January is 0!
        var ano = today.getFullYear();

        dia = dia + "/" + mes + "/" + ano

        var hora = d[4];
        var timestamp = dia + " " + hora
        console.log(timestamp)
        $.ajax({
            url: '/pontuacao',
            type: 'POST',
            data: {
                'pontuacao': pontos,
                'time': timestamp,
                '_csrf': document.getElementById('_csrf').value,
            },
            error: function (xhr, status, error) {},
            success: function (data) {}
            });
    }

    function Nuvem () {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = "-30px"; //480px termina
        this.element.style.top = (50 + Math.floor(Math.random()*30)) + "px";
        deserto.element.appendChild(this.element);
    }

    Nuvem.prototype.mover = function () {
        if (parseInt(this.element.style.right) > 700){
            ;
        }
        else{
            this.element.style.right = (parseInt(this.element.style.right) + velocidade) + "px";
        }
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
        if (parseInt(this.element.style.right) > 700){
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
        if(parseInt(this.element.style.right) >= 700){
            ;
        }else{
            this.element.style.right = (parseInt(this.element.style.right) + velocidade) + "px";
        }
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

    function colisao(dino, objeto, tp){
        A = dino.element.getBoundingClientRect()
        B = objeto.element.getBoundingClientRect()
        //corrigido bug que fazia com que os elementos colidissem mesmo após terem se distanciado
        //foi adicionado mais um e
        if (tp == 1){
            return ((A.top <= B.bottom && A.bottom >= B.top) && A.right >= B.left && B.left > 0) && A.left < B.right;
        }else if (tp == 2){
            return (A.right >= B.left && A.bottom >= B.top && B.left > 0 && A.left < B.right);
        }
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
        if(Math.floor(Math.random()*1000) <= PROB_PTRO){
            //console.log("qro criar ptro!")
            //se a posição do ptro for maior que 500 ele está apto a voltar ao deserto
            var dist1 = parseInt(cacto1.element.style.right)
            var dist2 = parseInt(cacto2.element.style.right)
            if (dist1 < 100 || dist2 < 100){
                console.log("mt perto pra criar")
            }else if (parseInt(ptero1.element.style.right) >= 700){
                ptero1 = new Ptero()
                //console.log("Criei um ptero")
            }
        }
        
        if (Math.floor(Math.random()*1000) <= PROB_NUVEM) { //cria nuvem
            nuvens.push(new Nuvem());
            //console.log("criei uma nuvem")
        }
        nuvens.forEach(function (n) {
            n.mover(); //480 é o fim do grid visualmente, max=500px
        });

        if(Math.floor(Math.random()*1000) <= PROB_CACTO){
            var dist1 = parseInt(cacto1.element.style.right)
            var dist2 = parseInt(cacto2.element.style.right)
            if (dist1 < 200 || dist2 < 200){
                console.log("mt perto pro cacto")
            }
            else{
                if(parseInt(cacto1.element.style.right) >= 700){
                    cacto1 = new Cacto(tipoCacto[Math.floor(Math.random()*10)])
                    //console.log("Criei um cacto")
                }
                else if (parseInt(cacto2.element.style.right) >= 700){
                    cacto2 = new Cacto(tipoCacto[Math.floor(Math.random()*10)])
                    //console.log("Criei um cacto")
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
        //console.log(pontos)

        
        if (colisao(dino, ptero1, 1)){
            dino.status = 4
            console.log("colisão com ptero")
        }
        if (colisao(dino, cacto1, 2)){
            dino.status = 4
            console.log("colisão com cacto1")
        }
        if (colisao(dino, cacto2, 2)){
            dino.status = 4
            console.log("colisão com cacto2")
        }
        
    }
    init();
})();