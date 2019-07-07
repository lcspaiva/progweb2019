module.exports = {
    index: async function(req, res){
        var cursos = await Curso.find();
        res.view('curso/index', { cursos: cursos });
    },

    // NOTAS:
    // pegando o modelo que o professor fez e usando como modelo para os outros controladores, 
    // é basicamente a mesma coisa, colocar try e catch e if else para ver se é um get ou post

    //cria um novo usuario e coloca no banco
    create: async function (req, res) {
        //se for um get, cai no if, se for um post cai no else
        // COLOCANDO NUM TRY CATCH COMO SUGERIDO PELO PROFESSOR
        if (req.route.methods.get) {
            res.view('curso/create');
        } else {
            try {
                // pegando as informações do payload do post e colocando no banco
                await Curso.create({
                    sigla: req.body.sigla,
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                })
                res.redirect('/curso');
            } catch (error) {
                res.view('curso/create', { error: error });
            }
        }
    },

    //lista que está no banco
    read: async function (req, res) {
        try {
            var curso = await Curso.find({
                id: req.params.cursoId,
            });
            res.view('curso/read', { curso:curso[0] });
        } catch (error) {
            console.log("Deu ruim aqui!")
            console.log(error)
        }
    },

    //muda informações de quem está no banco
    update: async function (req, res) {
        if (req.route.methods.get) {
            const curso = await Curso.find({
                id: req.params.cursoId,
            });
            res.view('curso/update', { curso:curso[0] });
        }else {
            try {
                //waterline pra update
                await Curso.update({
                    id: req.param('cursoId'),
                }).set({
                    sigla: req.body.sigla,
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                });
                res.redirect('/curso');
            } catch (error) {
                //precisa mesmo disso?
                console.log("Deu ruim aqui!")
                res.view('/curso', { error: error });
            }
        }
     },


    //deleta alguem do banco
    delete: async function(req, res){
        if (req.route.methods.get) {
            const curso = await Curso.find({
                id: req.params.cursoId,
            });
            res.view('curso/delete', { curso:curso[0] });
        } else {
            try {
                await Curso.destroy({
                    id:req.param('cursoId'),
                })
                res.redirect('/curso');
            } catch (error) {
                console.log("Deu ruim aqui!")
                res.view('curso/create', { error: error });
            }
        }
     },
};