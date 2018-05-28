module.exports = app => {
    app.get("/promocoes/form", (req,res) => {
        let connection = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(erros,resultados){
            res.render('promocoes/form',{lista:resultados});
        });

        connection.end();
    });

    app.post("/promocoes", (req,res) => {
        var promocao = req.body;
        app.get('io').emit('novaPromocao',promocao);
        res.redirect('promocoes/form');
    });
};