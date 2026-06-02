import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export async function login(email, senha) {
  const params = new URLSearchParams()
  params.append('username', email)
  params.append('password', senha)
  const { data } = await axios.post(`${API}/auth/token`, params)
  localStorage.setItem('token', data.access_token)
}

export async function cadastrar(nome, email, senha, curso) {
  await axios.post(`${API}/usuarios`, { nome, email, senha, curso })
}

export function logout() {
  localStorage.removeItem('token')
}
