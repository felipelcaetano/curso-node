let express = require('../config/express')();
let request = require('supertest')(express);

describe('#ProdutosController', () => {

    beforeEach(done => {
        let conn = express.infra.connectionFactory();
        conn.query("delete from livros", (err, results) => {
            if(!err) {
                done();
            }
        });
    });

    it('listagem json', done => {
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200, done);
    });

    it('#cadastro de novo produto com dados invalidos', done => {
        request.post('/produtos')
        .send({
            titulo: "", 
            descricao: "novo livro"
        })
        .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', done => {
        request.post('/produtos')
        .send({
            titulo: "titulo",
            descricao: "novo livro",
            preco: 20.50
        })
        .expect(302, done);
    });

});