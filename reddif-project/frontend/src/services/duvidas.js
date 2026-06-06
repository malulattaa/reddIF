import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export async function obterDisciplinas() {
  const response = await axios.get(`${API}/disciplinas`)
  return response.data
}

export async function publicarDuvida(dadosDuvida) {
  const token = localStorage.getItem('token')
  const response = await axios.post(`${API}/duvidas`, dadosDuvida, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}
