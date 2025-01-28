import "./acompanhamento.css";
import { useState, useEffect, SetStateAction } from "react";
import { FaChartLine, FaCheckCircle } from "react-icons/fa";
import { LuAlarmClock, LuFileSearch } from "react-icons/lu";
import { AiOutlineFileDone } from "react-icons/ai";
import Header from "../../components/Header";
import Sidemenu from "../../components/Sidemenu";
import axios from "axios";

// URL base da API Django
const URL_BASE = "http://127.0.0.1:8000/teste_proposta/";

// Interface para propostas
interface Proposta {
  dividas: any;
  faturamentos: any;
  garantias: any;
  empresa: any;
  data_envio: ReactNode;
  cliente: any;
  id: number;
  nome_empresa: string;
  valor: string | number;
  status: string;
  segmento?: string;
}

// Função para chamadas à API
const fetchData = async (
  endpoint: string,
  data = null,
  method = "GET",
  headers = null
) => {
  try {
    const config = {
      method,
      url: `${URL_BASE}${endpoint}`,
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...(headers || {}),
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao ${
        method === "GET"
          ? "buscar"
          : method === "POST"
          ? "criar"
          : method === "PUT"
          ? "atualizar"
          : "excluir"
      }:`,
      error
    );
    throw error;
  }
};

// Função para filtrar propostas por estágio
const filterProposals = (proposals: Proposta[], stageFilters: string[]) => {
  return proposals.filter((card) =>
    stageFilters.includes(card.status || "")
  );
};

// Componente para exibir um card de proposta
const ProposalCard = ({ card, onClick }: { card: Proposta; onClick: any }) => (
  <div className="proposal-card">
    <p className="proposal-id"># {card.id}</p>
    <h3 onClick={() => onClick(card)} className="proposal-name">
      {card.nome_proposta}
    </h3>
    <p className="proposal-category">Segmento: {card.segmento}</p>
  </div>
);

function Acompanhamento() {
  const [propostas, setPropostas] = useState<Proposta[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [propostaData, setPropostaData] = useState<Proposta | null>(null);
  const [columnsData, setColumnsData] = useState({
    "Novo negócio": 0,
    "Em análise": 0,
    "Formalização": 0,
    "Aprovado": 0,
    "Finalizado": 0,
  });
  const [isSidemenuVisible, setIsSidemenuVisible] = useState(false);

  const toggleModalProp = (data: SetStateAction<null | Proposta>) => {
    setPropostaData(data);
    setModalOpen((prev) => !prev);
  };

  const toggleSidemenu = () => {
    setIsSidemenuVisible((prevState) => !prevState);
  };

  // Função para calcular valores totais por estágio
  const atualizarValores = (propostas: Proposta[]) => {
    const totals = propostas.reduce(
      (acc, card) => {
        const { status, valor } = card;
        const valorNumerico = parseFloat(`${valor}`);

        if (!isNaN(valorNumerico)) {
          if (status === "Nova Proposta")
            acc["Novo negócio"] += valorNumerico;
          else if (["agro", "sim"].includes(status))
            acc["Em análise"] += valorNumerico;
          else if (status === "Analise")
            acc["Formalização"] += valorNumerico;
          else if (status === "MANDATADO")
            acc["Aprovado"] += valorNumerico;
          else if (status === "PAGO")
            acc["Finalizado"] += valorNumerico;
        }

        return acc;
      },
      {
        "Novo negócio": 0,
        "Em análise": 0,
        "Formalização": 0,
        "Aprovado": 0,
        "Finalizado": 0,
      }
    );

    setColumnsData(totals);
  };

  // Carregar propostas na montagem do componente
  useEffect(() => {
    async function carregarPropostas() {
      setCarregando(true);
      try {
        // Buscar dados principais
        const dados = await fetchData("create_list");
  
        // Obter informações adicionais para cada proposta
        const propostasCompletas = await Promise.all(
          dados.deu.map(async (proposta: { id: any; }) => {
            const detalhes = await fetchData(`get_proposta/${proposta.id}`);
            
            // Remover campos duplicados
            const { p_base, ...detalhesSemDuplicados } = detalhes;
  
            // Combinar os dados da proposta principal com os detalhes adicionais
            return {
              ...proposta,
              ...detalhesSemDuplicados,
            };
          })
        );
  
        // Atualizar estado com as propostas completas
        setPropostas(propostasCompletas);
        atualizarValores(propostasCompletas);
  
        console.log(propostasCompletas);
      } catch (err) {
        alert("Erro ao carregar propostas. Tente novamente mais tarde.");
        console.error("Erro: ", err);
      } finally {
        setCarregando(false);
      }
    }
  
    carregarPropostas();
  }, []);
  

  const columns = [
    {
      icon: <FaChartLine />,
      title: "Novo negócio",
      filter: ["Nova Proposta"], //colocar os status
      className: "blue",
    },
    {
      icon: <LuFileSearch />,
      title: "Em análise",
      filter: ["Analise"], //colocar os status
      className: "yellow",
    },
    {
      icon: <LuAlarmClock />,
      title: "Aprovado",
      filter: ["Mandatado"], //colocar os status
      className: "green",
    },
    {
      icon: <AiOutlineFileDone />,
      title: "Formalização",
      filter: ["Teste"], //colocar os status
      className: "purple",
    },
    {
      icon: <FaCheckCircle />,
      title: "Finalizado",
      filter: ["Pago", "Finalizado"], //colocar os status
      className: "darkgreen",
    },
  ];

  return (
    <div className="app">
      <Header onToggleSidemenu={toggleSidemenu} />
      <Sidemenu pagAtual={"Minhas operações"} visible={isSidemenuVisible} />
      <div className="acompanhamento">
        {carregando && <p>Carregando...</p>}
        <div className="header-columns">
          {columns.map((col, index) => (
            <div className={`column ${col.className}`} key={index}>
              <div className="icon-title">
                <span className="icon">{col.icon}</span>
                <span className="title">{col.title}</span>
              </div>
              <div className="value">R$ {columnsData[col.title]?.toFixed(2) || 0}</div>
            </div>
          ))}
        </div>

        <div className="columns">
          {columns.map((col, index) => (
            <div key={index} className="card-column">
              {filterProposals(propostas, col.filter).length ? (
                filterProposals(propostas, col.filter).map((card, idx) => (
                  <ProposalCard key={idx} card={card} onClick={toggleModalProp} />
                ))
              ) : (
                <p className="empty-state">Nenhuma proposta em "{col.title}"</p>
              )}
            </div>
          ))}
        </div>

        {isModalOpen && propostaData && (
          <div className="propostaModal">
            <div className="propostaModalBox">
              <button className="closePropModal" onClick={() => setModalOpen(false)}>Fechar</button>
              <h4>#{propostaData.id}</h4>
              <h3>{propostaData.nome_empresa}</h3>
              <p>Setor: {propostaData.segmento || "Não informado"}</p>
              <p>Status atual: {propostaData.status}</p>  
              <p>Data de envio: {propostaData.data_envio}</p>
              
              {/* Exibir segmento somente se existir */}
              {propostaData.cliente && (
                <><p>Nome: {propostaData.cliente.nome || "Não informado"}</p><p>Cliente: Pessoa {propostaData.cliente.tipo_cliente || "Não informado"}</p><p>Email: {propostaData.cliente.email || "Não informado"}</p><p>Contato: {propostaData.cliente.contato || "Não informado"}</p><p>Comentário: {propostaData.cliente.coments || "Não informado"}</p><p>Tipo de Operação: {propostaData.cliente.tipo_operacao || "Não informado"}</p></>
              )}
              <p></p>
              <div className="proposta-detalhes">
            {/* Informações da Empresa */}
            {propostaData.empresa && (
              <div className="empresa-info">
                <h3>Empresa</h3>
                {propostaData.empresa.nome && <p>Nome: {propostaData.empresa.nome}</p>}
                {propostaData.empresa.cnpj && <p>CNPJ: {propostaData.empresa.cnpj}</p>}
                {propostaData.empresa.site && <p>Site: {propostaData.empresa.site}</p>}
                {propostaData.empresa.email && <p>Email: {propostaData.empresa.email}</p>}
                {propostaData.empresa.contato && <p>Contato: {propostaData.empresa.contato}</p>}
                {propostaData.empresa.coments && <p>Comentários: {propostaData.empresa.coments}</p>}
                {propostaData.empresa.setor_atuacao && <p>Setor de Atuação: {propostaData.empresa.setor_atuacao}</p>}
                <p>Recuperação Judicial: {propostaData.empresa.recuperacao_judicial ? "Sim" : "Não"}</p>
                <p>Balanço Auditado: {propostaData.empresa.balanco_auditado ? "Sim" : "Não"}</p>
                {propostaData.empresa.tipo_operacao && <p>Tipo de Operação: {propostaData.empresa.tipo_operacao}</p>}
              </div>
            )}

            {/* Garantias */}
            {propostaData.garantias && (
              <div className="garantias-info">
                <h3>Garantias</h3>
                {propostaData.garantias.disponiveis && <p>Disponíveis: {propostaData.garantias.disponiveis}</p>}
                {propostaData.garantias.valor && <p>Valor: {propostaData.garantias.valor}</p>}
              </div>
            )}

            {/* Faturamentos */}
            {propostaData.faturamentos && (
              <div className="faturamentos-info">
                <h3>Faturamentos</h3>
                {propostaData.faturamentos.faturamento_2022 && (
                  <p>Faturamento 2022: {propostaData.faturamentos.faturamento_2022}</p>
                )}
                {propostaData.faturamentos.faturamento_2023 && (
                  <p>Faturamento 2023: {propostaData.faturamentos.faturamento_2023}</p>
                )}
                {propostaData.faturamentos.faturamento_2024 && (
                  <p>Faturamento 2024: {propostaData.faturamentos.faturamento_2024}</p>
                )}
              </div>
            )}

            {/* Dívidas */}
            {propostaData.dividas && (
              <div className="dividas-info">
                <h3>Dívidas</h3>
                {propostaData.dividas.valor_total && <p>Valor Total: {propostaData.dividas.valor_total}</p>}
                {propostaData.dividas.div_tributaria && <p>Dívida Tributária: {propostaData.dividas.div_tributaria}</p>}
                {propostaData.dividas.div_bancaria && <p>Dívida Bancária: {propostaData.dividas.div_bancaria}</p>}
              </div>
            )}
          </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Acompanhamento;
