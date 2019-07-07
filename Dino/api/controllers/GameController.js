/**
 * GameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //chama o jogo
    trex: async function (req, res) {
        res.view('game/trex');
        },
    
    //cria uma entrada no banco na tabela de pontuações
    pontuacao: async function (req, res) {
        await Jogada.create({
            pontuacao: req.body.pontuacao,
            jogador: req.me.id,
            data: req.body.time,
        });
        res.end('Pontuação salva');
    },


    // colocando o controlador do ranking dentro do mesmo controlador por preguiça de ter que criar outro arquivo
    // se funcionou é pq tá certo
    //lista a tabela de pontos
    ranking: async function (req, res) {
        var jogadas = await Jogada.find(
            { where: { pontuacao: { '>=': 0 } }, sort: 'pontuacao DESC' }
        )
        var jogadores = await User.find()
        console.log(jogadas)
        console.log(jogadores)
        res.view('game/ranking', {jogadas: jogadas, jogadores: jogadores});
    },
};

