const express = require('express');
const app = express();

const porta = 8080;
const rota = express.Router()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    // habilitar o body-Parser a receber dados em formato JSON
    extended: true
}));

app.use('/', rota);
app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const db = require('./servidor')
const Produtos = db.Mongoose.model('esquemaProdutos', db.ProductSchema, 'produtos')

/* Rota Padrão */
rota.get('/', async (requisicao, resposta) => {
    resposta.send('<h1> Servidor de internet NodeJS funcionando.</h1>')
})

/* Todos os produtos JSON. */
rota.get('/produtosdb', async (requisicao, resposta) => {
    await Produtos.find({}).lean().exec(function (e, listaRegistros) {
        resposta.json(listaRegistros)
        resposta.end()
    })
})

/* Rota localhost:8080/produtos */
rota.get('/produtos', async (requisicao, resposta) => {
    const listaProdutos = await Produtos.find({}).lean().exec()
    resposta.render('formprodutos', { listaProdutos })
})

/* GET Incluir novo . */
rota.get('/inclui', (requisicao, resposta) => {
    resposta.render('formincluir', { title: 'Cadastro Produto' })
})

rota.post('/inclui', async (requisicao, resposta) => {
    let name = requisicao.body.nome
    let price = requisicao.body.price
    let cel = new Produtos({ name, price })
    try {
        await cel.save()
        resposta.redirect('/produtos')
    }
    catch (err) {
        next(err)
    }
})

//GET edit
rota.get('/editar/:id', async (requisicao, resposta) => {
    const id = requisicao.params.id
    const registro = await Produtos.findById({ "_id": id })
    resposta.render('formeditar', { title: 'Alterar Produto', registro, action: '/editar/' + registro.id })
})

/* POST editar user */
rota.post('/editar/:id', async (requisicao, resposta) => {
    const id = requisicao.params.id
    const name = requisicao.body.nome
    const price = requisicao.body.price
    await Produtos.updateOne({ _id: id }, { $set: { name: name, price: price } })
    resposta.redirect('/produtos')
})

/* excluir usuario */
rota.get('/excluir/:id', async (requisicao, resposta) => {
    const id = requisicao.params.id
    const name = requisicao.body.nome
    const price = requisicao.body.price
    await Produtos.deleteOne({ _id: id })
    resposta.redirect('/produtos')
})

app.listen(porta, function () {
    console.log("Servidor rodando na url http://localhost:" + porta)
})
//localhost:8080