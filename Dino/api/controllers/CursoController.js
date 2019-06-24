module.exports = {
    index: async function(req, res){
        var cursos = await Curso.find();
        res.view('curso/index', { cursos: cursos });
    },


    create: async function (req, res) {
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
        try {
            const curso = await Curso.find({
                id: req.params.cursoId,
            });
            res.view('curso/update', { curso:curso[0] });
        } catch (error) {
            console.log("Deu ruim aqui!")
            console.log(error)
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
};