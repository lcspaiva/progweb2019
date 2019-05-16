function counter (num) {
    var aux = num
    function N (){
        aux ++
        return aux 
    }
    return N
}

var incrementar = counter(1);
console.log('Primeira chamada ', incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());
