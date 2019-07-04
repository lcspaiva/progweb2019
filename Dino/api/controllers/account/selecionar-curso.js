/**
 * Module dependencies
 */

// ...


/**
 * account/selecionar-curso.js
 *
 * Selecionar curso.
 */
module.exports = async function (req, res) {
  try {
    //pegando todos os cursos do banco para montar o menuzinho
    var cursos = await Curso.find();

    //puxando o perfil do usuario logado
    var user = await User.find({
      id: req.session.userId,
    });

    //puxando o curso do usuario do banco/tabelaCurso
    var curso_user = await Curso.find({
        id: user[0].curso,
    });
    if (req.route.methods.get) { //se for um get simplesmente direciona à pagina de edição
        //enviando para a pagina: o curso do usuario, a lista de cursos do banco, e o id do usuário
        res.view('pages/account/edit-curso', {curso_user: curso_user[0], cursos: cursos, user: user});
    } else { //se for um post, vamos atualizar o curso do usuario no banco
        await User.update({
            //pega o id do usuario logado e usa pra indexar no banco
            id: req.session.userId
        }).set({
            //usa o nome do campo do formulario vindo do post, o mesmo nome do campo
            curso: req.body.seleciona_curso,
        });
        res.redirect('/account')     
    }
  } catch (error) {
      console.log("Deu ruim aqui!")
      console.log(error);
}
};
