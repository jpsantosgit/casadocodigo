module.exports = function (app) {
    app.get('/promocoes/form', function (req, res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function (err, results) {
            res.render('promocoes/form', {lista:results});
        });
    });

    app.post('/promocoes', function (req, res) {
        var promocao = req.body
        // emit: manda um aviso que algum evento aconteceu
        app.get('io').emit('novaPromocao', promocao);
        res.redirect('promocoes/form');
    });
}
