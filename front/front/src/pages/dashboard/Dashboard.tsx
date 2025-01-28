import { useState, useEffect } from "react";
import { Link } from "react-router";

import Sidemenu from "../../components/Sidemenu";
import Header from "../../components/Header";

import axios from "axios";

import style from "./dashboard.module.css";

export default function Dashboard() {
  const [isSidemenuVisible, setIsSidemenuVisible] = useState(false);
  const [propostas, setPropostas] = useState([]);
  const [status, setStatus] = useState({ pendencias: 0, emAnalise: 0, aprovados: 0 });
  const [campanhas, setCampanhas] = useState([]);

  const toggleSidemenu = () => {
    setIsSidemenuVisible((prevState) => !prevState);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");

        // Buscando propostas
        const responsePropostas = await axios.get("http://127.0.0.1:8000/teste_proposta/create_list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const propostasData = responsePropostas.data.deu.reverse();

        // Calculando status
        const statusCounts = propostasData.reduce(
          (acc, proposta) => {
            if (proposta.status === "Pendente") acc.pendencias++;
            if (proposta.status === "Analise") acc.emAnalise++;
            if (proposta.status === "Aprovado") acc.aprovados++;
            return acc;
          },
          { pendencias: 0, emAnalise: 0, aprovados: 0 }
        );

        // Buscando campanhas
        const responseCampanhas = await axios.get("http://127.0.0.1:8000/campanhas_promocionais", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const campanhasData = responseCampanhas.data;

        setPropostas(propostasData);
        setStatus(statusCounts);
        console.log(status)
        setCampanhas(campanhasData);
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    }

    fetchData();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Header onToggleSidemenu={toggleSidemenu} />
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Sidemenu pagAtual={"Home"} visible={isSidemenuVisible} />
        <main className={style.dashboard}>
          <div className={style.dashboardRow2060}>
            <article className={style.iniNovaProp}>
              Iniciar
              <Link
                to={"/nova-proposta"}
                style={{
                  fontWeight: "200px",
                  padding: "4px 12px",
                  color: "#3e3e3e",
                  textDecoration: "none",
                  width: "100%",
                  background: "linear-gradient(to right, #ebb409, #f8cd0d)",
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                Nova Proposta
              </Link>
            </article>

            <article className={style.contadorPropostas} style={{ backgroundColor: "#251717" }}>
              <div className={style.statusProposta}>
                <span className={style.statusRow} style={{ fontWeight: "bold" }}>
                  Pendências
                </span>
                <span className={style.valor}>{status.pendencias}</span>
              </div>
            </article>

            <article className={style.contadorPropostas} style={{ backgroundColor: "#282212" }}>
              <div className={style.statusProposta}>
                <span className={style.statusRow} style={{ color: "#c09829", fontWeight: "bold" }}>
                  Em análise
                </span>
                <span className={style.valor}>{status.emAnalise}</span>
              </div>
            </article>

            <article className={style.contadorPropostas} style={{ backgroundColor: "#142118" }}>
              <div className={style.statusProposta}>
                <span className={style.statusRow} style={{ color: "#33a45f", fontWeight: "bold" }}>
                  Aprovados
                </span>
                <span className={style.valor}>{status.aprovados}</span>
              </div>
            </article>
          </div>

          <div className={style.dashboardRow7510}>
            <h4>Últimas propostas</h4>
            <section className={style.ultimasPropostas}>
              {propostas.length > 0 ? (
                propostas.slice(0, 3).map((proposta, index) => {
                  let statusClass = "";
                  switch (proposta.status) {
                    case "Nova Proposta":
                      statusClass = style.novaProposta;
                      break;
                    case "Em Análise":
                      statusClass = style.emAnalise;
                      break;
                    case "Pendências":
                      statusClass = style.pendencias;
                      break;
                    case "Aprovada":
                      statusClass = style.aprovada;
                      break;
                    default:
                      statusClass = style.statusDesconhecido;
                  }

                  return (
                    <article key={index} className={style.proposta}>
                      <h4>{proposta.nome_proposta}</h4>
                      <p>Tipo da proposta: {proposta.segmento}</p>
                      <p>Data de envio: {formatDate(proposta.data_envio)}</p>
                      <p>
                        Status: <span className={statusClass}>{proposta.status || "Desconhecido"}</span>
                      </p>
                    </article>
                  );
                })
              ) : (
                <article className={style.semProposta}>
                  <p>Você não tem propostas enviadas</p>
                </article>
              )}
            </section>
          </div>

          <h4 style={{ marginTop: "20px" }}>Últimas campanhas</h4>
          <div className={style.dashboardRow4040}>
            {campanhas.length > 0 ? (
              campanhas.map((campanha, index) => (
                <div key={index} className={style.cardCampanha}>
                  <img src={campanha.imagem} alt={campanha.titulo} />
                  <h5>{campanha.titulo}</h5>
                </div>
              ))
            ) : (
              <p>Nenhuma campanha disponível</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
