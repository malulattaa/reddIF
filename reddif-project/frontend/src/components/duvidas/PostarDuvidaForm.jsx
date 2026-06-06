import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function PostarDuvidaForm() {
  const navigate = useNavigate()
  
 
  const [titulo, setTitulo] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [descricao, setDescricao] = useState('')
  const [anonimo, setAnonimo] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  
  
  const [erro, setErro] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  

  const [listaDisciplinas, setListaDisciplinas] = useState([])
  const [carregandoDisciplinas, setCarregandoDisciplinas] = useState(true)


  useEffect(() => {
    async function buscarDisciplinas() {
      try {
        await new Promise(resolve => setTimeout(resolve, 600))
        setListaDisciplinas([
            { id: 1, nome: 'Banco de Dados' },
            { id: 2, nome: 'Algoritmos e Lógica' },
            { id: 3, nome: 'Desenvolvimento Web' },
            { id: 4, nome: 'Engenharia de Software' }
          ])
      } catch (error) {
        console.error("Erro ao carregar disciplinas:", error)
        setErro("Não foi possível carregar as disciplinas do sistema.")
      } finally {
        setCarregandoDisciplinas(false)
      }
    }

    buscarDisciplinas()
  }, [])

  function handleAddTag(e) {
    e.preventDefault()
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  function handleRemoveTag(tagToRemove) {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (!titulo.trim() || !disciplina || !descricao.trim()) {
      setErro('Por favor, preencha todos os campos obrigatórios (*).')
      return
    }

    const novaDuvida = { 
        titulo, 
        disciplina_id: Number(disciplina), 
        descricao, 
        tags, 
        anonimo 
      }
    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      navigate('/feed', { state: { postado: true } })
    } catch (error) {
      console.error("Erro na API:", error)
      const mensagemServidor = error.response?.data?.detail 
      setErro(mensagemServidor || 'Ocorreu um erro ao conectar com o servidor. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }


// ======================== FUNCIONA COM O BACK ===============================
// useEffect(() => {
//     async function carregarDisciplinas() {
//       try {
//         const dados = await obterDisciplinas();
//         setListaDisciplinas(dados);
//       } catch (error) {
//         console.error("Erro ao carregar disciplinas:", error);
//         setErro("Não foi possível carregar as disciplinas.");
//       } finally {
//         setCarregandoDisciplinas(false);
//       }
//     }
//     carregarDisciplinas();
//   }, [])

//   function handleAddTag(e) {
//     e.preventDefault()
//     if (tagInput.trim() && !tags.includes(tagInput.trim())) {
//       setTags([...tags, tagInput.trim()])
//       setTagInput('')
//     }
//   }

//   function handleRemoveTag(tagToRemove) {
//     setTags(tags.filter(tag => tag !== tagToRemove))
//   }


//   async function handleSubmit(e) {
//     e.preventDefault()
//     setErro('')

//     if (!titulo.trim() || !disciplina || !descricao.trim()) {
//       setErro('Por favor, preencha todos os campos obrigatórios (*).')
//       return
//     }

//     const novaDuvida = { 
//         titulo, 
//         disciplina_id: Number(disciplina), 
//         descricao, 
//         tags, 
//         anonimo 
//     }
    
//     setIsSubmitting(true)

//     try {
//       await publicarDuvida(novaDuvida);
//       alert('Dúvida publicada com sucesso!')
//       navigate('/feed')
//     } catch (error) {
//       console.error("Erro na API:", error)
//       const mensagemServidor = error.response?.data?.detail 
//       setErro(mensagemServidor || 'Ocorreu um erro ao publicar sua dúvida.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }


  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
      
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        <div className="bg-[#fff0e6] w-12 h-12 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Nova dúvida</h1>
          <p className="text-sm text-gray-500">Compartilhe sua dúvida com a comunidade</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {erro && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium border border-red-100">
            {erro}
          </div>
        )}

        <div>
          <label htmlFor="titulo" className="block text-sm font-semibold text-gray-800 mb-1">
            Título da dúvida <span className="text-red-500">*</span>
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Como implementar autenticação JWT em Node.js?"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="disciplina" className="block text-sm font-semibold text-gray-800 mb-1">
            Disciplina <span className="text-red-500">*</span>
          </label>
          <select
            id="disciplina"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            disabled={carregandoDisciplinas} 
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white text-gray-600 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">
              {carregandoDisciplinas ? 'Carregando disciplinas...' : 'Selecione uma disciplina'}
            </option>
            
            {listaDisciplinas.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="descricao" className="block text-sm font-semibold text-gray-800 mb-1">
            Descrição detalhada <span className="text-red-500">*</span>
          </label>
          <textarea
            id="descricao"
            rows="5"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva sua dúvida em detalhes..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        <div>
          <label htmlFor="tag-input" className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-1.5">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            Tags (opcional)
          </label>
          <div className="flex gap-2">
            <input
              id="tag-input"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Ex: JavaScript, React, etc."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
            <button 
              onClick={handleAddTag}
              type="button"
              className="bg-[#fff0e6] text-orange-600 hover:bg-orange-100 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
            >
              Adicionar
            </button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="text-gray-400 hover:text-red-500">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <label className="bg-[#fff0e6] border border-orange-100 rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-orange-50/50 transition-colors">
          <div className="pt-0.5">
            <input 
              type="checkbox" 
              checked={anonimo}
              onChange={(e) => setAnonimo(e.target.checked)}
              className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500" 
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-gray-800 text-sm mb-0.5">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-orange-500">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Postar anonimamente
            </div>
            <p className="text-xs text-gray-600">
              Sua identidade não será revelada. Apenas moderadores poderão ver seu nome para fins de segurança.
            </p>
          </div>
        </label>

        <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`font-semibold py-3 px-8 rounded-xl text-sm flex-1 transition-colors ${
              isSubmitting 
                ? 'bg-orange-300 cursor-not-allowed text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            {isSubmitting ? 'Publicando...' : 'Publicar dúvida'}
          </button>
          <button 
            type="button"
            onClick={() => navigate('/feed')}
            disabled={isSubmitting}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  )
}