
import axios from 'axios';

const API_URL = 'http://localhost:8000';


export async function obterDisciplinas() {
  const response = await axios.get(`${API_URL}/disciplinas`);
  return response.data;
}


export async function publicarDuvida(dadosDuvida) {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/duvidas`, dadosDuvida, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}