// Importando as bibliotecas necessárias
const express = require('express');
const cors = require('cors');


// Criando uma instância do aplicativo Express
const app = express();
const PORT = 80; // Porta na qual o servidor será executado

app.use(cors());


// Definindo as rotas para horóscopo diário pelo signo
app.get('/signo/:signo/dia', (req, res) => {
    const signo = req.params.signo;
    // Aqui você pode implementar a lógica para retornar o horóscopo diário pelo signo solicitado
    res.send(`Horóscopo diário para o signo ${signo}`);
});

// Definindo as rotas para horóscopo semanal pelo signo
app.get('/signo/:signo/semana', (req, res) => {
    const signo = req.params.signo;
    // Aqui você pode implementar a lógica para retornar o horóscopo semanal pelo signo solicitado
    res.send(`Horóscopo semanal para o signo ${signo}`);
});

// // Definindo as rotas para horóscopo diário pela data de nascimento
// app.get('/:dataDeNascimento/dia', (req, res) => {
//     const dataDeNascimento = req.params.dataDeNascimento;
//     // Aqui você pode implementar a lógica para retornar o horóscopo diário pela data de nascimento solicitada
//     res.send(`Horóscopo diário para a data de nascimento ${dataDeNascimento}`);
// });

// // Definindo as rotas para horóscopo semanal pela data de nascimento
// app.get('/:dataDeNascimento/semana', (req, res) => {
//     const dataDeNascimento = req.params.dataDeNascimento;
//     // Aqui você pode implementar a lógica para retornar o horóscopo semanal pela data de nascimento solicitada
//     res.send(`Horóscopo semanal para a data de nascimento ${dataDeNascimento}`);
// });

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


