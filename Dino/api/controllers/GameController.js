/**
 * GameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    trex: async function (req, res) {
        res.view('game/trex');
        },

    pontuacao: async function (req, res) {
        await Jogada.create({
            pontuacao: req.body.pontuacao,
            jogador: req.me.id,
            data: req.body.time,
        });
        res.end('Pontuação salva');
    },

    ranking: async function (req, res) {
        var jogadas = await Jogada.find(
            { where: { pontuacao: { '>=': 0 } }, sort: 'pontuacao DESC' }
        )
        res.view('game/ranking', jogadas);
    },
};

