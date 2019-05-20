function Sala(nome_disciplina, qntd_Alunos){
    
    var sala = {}
    sala.disciplina = nome_disciplina
    sala.alunos = qntd_Alunos

    sala.adcionaAluno = function(num){
        sala.alunos += num
    }
    sala.removeAluno = function(num){
        sala.alunos -= num
    }
    return sala
}

var ICC404 = Sala("Programação Web", 40)
var ICC202 = Sala("Avaliação de Desempenho", 20)

console.log(ICC202.disciplina)
console.log(ICC202.alunos)