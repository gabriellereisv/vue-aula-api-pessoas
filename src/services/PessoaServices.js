import axios from 'axios';

const API_URL = "https://localhost:7003/api/pessoas"

export default{
    listarTodasPessoas()
    {
        return axios.get(`${API_URL}/listar`);
    },
    deletarPessoaId(id)
    {
        return axios.delete(`${API_URL}/${id}`);
    },
    editarPessoa(id, pessoa)
    {
        return axios.put(`${API_URL}/${id}`,pessoa);
    },
    salvarPessoa(pessoa)
    {
        return axios.post(`${API_URL}`,pessoa);
    }
}