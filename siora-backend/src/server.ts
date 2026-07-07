import express from 'express';
import cors from 'cors';
import pool from './config/database.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Ativa o conjunto de rotas de autenticação sob o prefixo /api
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao PostgreSQL:', err.stack);
    }
    console.log('Conexão com o PostgreSQL estabelecida com sucesso!');
    release();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});