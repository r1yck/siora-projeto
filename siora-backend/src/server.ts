import express from 'express';
import cors from 'cors';
import pool from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes';
import alunoRoutes from './routes/alunoRoutes';
import path from 'path';
import submissaoRoutes from './routes/submissaoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', alunoRoutes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/api', submissaoRoutes);

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