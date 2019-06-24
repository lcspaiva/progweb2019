module.exports = {
    index: async function(req, res){
        var cursos = await Curso.find();
        res.view('curso/index', { cursos: cursos });
    },


    create: async function (req, res) {
        //se for um get, cai no if, se for um post cai no else
        if (req.route.methods.get) {
            res.view('curso/create');
        } else {
            try {
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
                console.log("Deu ruim aqui!")
                res.view('/curso', { error: error });
            }
        }
     },

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