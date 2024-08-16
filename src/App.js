// bloco de importações

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./services/api"

function App() {

  const [input, setInput] = useState('');
  const [CNPJ, setCNPJ] = useState({});

  
  // função assíncrona
  async function handleSearch(){
    
    if(input === ''){
      alert("Preencha algum CNPJ!")
      return;
    }


    // tratativa de erros
    try{
      const response = await api.get(`${input}`)
      setCNPJ(response.data)
      setInput("")
    }catch{
      alert("Erro ao buscar CNPJ!")
      setInput("")
    }

  }

  return (
    // estrutura HTML para preenchimento
    <div className="container">
      <h1 className="title">Consultar CNPJ</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CNPJ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {/* Validação de NPJ e desconstrução de objeto JSON */}

      {Object.keys(CNPJ).length > 0 && (
        <main className="main">
          <h2>razao social: {CNPJ.razao_social}</h2>
          <span>fundaçao:{CNPJ.data_inicio_atividade}</span>
          <span>situação cadastral: {CNPJ.descricão_situacao_cadastral}</span>
          <span>contato: {CNPJ.ddd_fax}</span>
        </main>
      )} 

    </div>
  );
}

export default App;
