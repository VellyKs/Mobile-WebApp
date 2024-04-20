// Importando as bibliotecas necessárias
const express = require("express");
const cors = require("cors");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");


dotenv.config();


// Criando uma instância do aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000; // Porta na qual o servidor será executado

app.use(express.json());
app.use(express.static("express"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/diario", async (req, res) => {
  try {
    const { data, error } = await supabase.from("diario").select("*");
    if (error) {
      throw error;
    }
    res.json(data);
    console.log("Dados do diário:", data);
  } catch (error) {
    console.error("Erro ao recuperar dados da tabela diario:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/diario", async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição
    const respo = req.body;

    // Inserir os dados na tabela diario
    const { data, error } = await supabase.from("diario").insert(respo);
    
    if (error) {
      throw error;
    }

    // Responder com os dados inseridos
    res.json(data);
  } catch (error) {
    console.error("Erro ao inserir dados na tabela diario:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
