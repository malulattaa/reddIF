import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export async function obterDisciplinas() {
  const { data } = await axios.get(`${API}/disciplinas`)
  return data
}

export async function obterDuvidas() {
  const { data } = await axios.get(`${API}/duvidas`)
  return data
}

export async function publicarDuvida(dadosDuvida) {
  const token = localStorage.getItem('token')
  const { data } = await axios.post(`${API}/auth/post`, dadosDuvida, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}
