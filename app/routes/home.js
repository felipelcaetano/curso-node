module.exports = (app) => {
    app.get('/', (req, res) => {
        let connection = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista((err, results) => {
            if(err){
                return next(err);
            }
            res.format({
                html: () => {
                    res.render('home/index', {
                        livros: results
                    });
                },
                json: () => {
                    res.json(results);
                }
            });
            
        });

        connection.end();
    });
};