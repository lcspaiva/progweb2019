// David: Código implementado corretamente 
// Nota: 2.0

class Empregado{
    constructor(nome, salario){
        this.nome = nome
        if (salario < 0.0){
            this.salario = 0.0
        }else{
            this.salario = salario
        }
    }
    getSalario(){return this.salario}
    setSalario(salario){
        if (salario < 0.0){
            this.salario = 0.0
        }else{
            this.salario = salario
        }
    }

    getNome(){return this.nome}
    setNome(nome){this.nome=nome}
}

emp1 = new Empregado("Lucas", 8000)
emp2 = new Empregado("David", 20000)

console.log("Salario base")
console.log(emp1.getSalario())
console.log(emp2.getSalario())

emp1.setSalario(emp1.getSalario() + emp1.getSalario() * 0.1)
emp2.setSalario(emp2.getSalario()+ emp2.getSalario() * 0.1)

console.log("Depois do aumento")
console.log(emp1.getSalario())
console.log(emp2.getSalario())