import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export async function login(email, senha) {
  const { data } = await axios.post(`${API}/auth/login`, { email, senha })
  localStorage.setItem('token', data.acess_token)
}

export async function cadastrar(nome, email, senha, curso) {
  await axios.post(`${API}/auth/cadastro`, { nome, email, senha, curso })
}

export function logout() {
  localStorage.removeItem('token')
}

export async function getPerfil() {
  const token = localStorage.getItem('token')
  const { data } = await axios.get(`${API}/auth/perfil`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return data
}
