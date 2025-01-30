import React, { useState } from "react";
import { Link } from "react-router";
import { steps } from "./SegmentoInvestimentosSteps";
import { render_step } from "./SegmentoInvestimentosFunctions";
import "./SegmentoInvestimentos.css";
import axios from 'axios';
import { API_BASE_URL } from "../../config";

function SegmentoInvestimentos() {
  interface Cliente {
    nome: string;
    faturamento: string;
    profissao: string;
    idade: string;
    rentabilidade_esperada: string;
    moradia: string;
    coments: string;
    fisico_juridico: string;
    profissional_qualificado: string;
    cliente_investe: boolean;
    quant_aplicado: string;
  }

  // const [infoCliente, setInfoCliente] = useState<Cliente | {}>({});
  const [infoCliente, setInfoCliente] = useState<Cliente | null>(null);

  const [docs, setDocs] = useState<File[]>([]);

  const handle_info_empresa = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setInfoCliente((prevData) => {  
      if (prevData) {
        return { ...prevData, [name]: value };
      }
      return prevData;
    });
  };

  const handle_docs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setDocs((prevDocs) => [...prevDocs, ...Array.from(files)]);
    }
  };

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = localStorage.getItem('username') || "Desconhecido";
    
    const data = {
      p_base: {
        nome_proposta: infoCliente?.nome,
        segmento: "investimento",
        status: "Novo negócio",
      },
      cliente: infoCliente,
    };

    if (data.cliente && data.cliente.cliente_investe === true) {
      data.cliente.cliente_investe = true;
    } else if (data.cliente && data.cliente.cliente_investe === false) {
      data.cliente.cliente_investe = false;
    }

    try {
      // Envia a proposta principal e obtém o ID retornado
      const response = await axios.post(
        `${API_BASE_URL}/teste_proposta/create_list`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Remova se não for usar autenticação
          },
        }
      );

      const propostaId = response.data.sucesso.id; // Obtém o ID retornado

      const bitrixData = {
        fields: {
          TITLE: data.p_base.nome_proposta,
          STATUS_ID: "NEW",
          NAME: username,
          COMPANY_TITLE: infoCliente?.nome || "Empresa não informada",
          COMMENTS:`
            Originador: ${username}
            Segmento: INVESTIMENTOS,

            Nome do cliente: ${infoCliente?.nome || "N/A"},
            Faturamento/Renda mensal: R$ ${infoCliente?.faturamento || "N/A"},
            Profissão: ${infoCliente?.profissao || "N/A"},
            Idade: ${infoCliente?.idade || "N/A"},
            Rentabilidade média esperada: ${infoCliente?.rentabilidade_esperada || "N/A"},
            Onde o cliente mora: ${infoCliente?.moradia || "N/A"},
            Comentários: ${infoCliente?.coments || "N/A"},

            Cliente é Pessoa Física ou Jurídica?: ${infoCliente?.fisico_juridico || "N/A"},
            Cliente é Pessoa Física ou Jurídica?: ${infoCliente?.profissional_qualificado || "N/A"},
            Cliente já investe?: ${infoCliente?.cliente_investe || "N/A"},
            Em caso de resposta afirmativa, quanto o cliente tem aplicado?: R$ ${infoCliente?.quant_aplicado || "N/A"},
            
            `,
        },
      };


      const bitrixWebhookUrl = "https://b24-c2d8dr.bitrix24.com.br/rest/23/znwiqx8ibzt2vixd/crm.lead.add.json";

      const bitrixResponse = await axios.post(bitrixWebhookUrl, bitrixData, {
        headers: { "Content-Type": "application/json" },
      });

      if (bitrixResponse.data.result) {
        console.log("Lead enviado ao Bitrix24 com sucesso:", bitrixResponse.data.result);
      } else {
        console.error("Erro ao enviar lead ao Bitrix24:", bitrixResponse.data.error);
      }
      
      // Itera sobre os arquivos para enviar cada um com o ID da proposta
      for (const doc of docs) {
          const formData = new FormData();
          formData.append('file', doc);
          formData.append('proposta_id', propostaId);
          
          console.log("docs: ", doc)
          console.log("formdata: ",   formData)
          try {
              const docResponse = await axios.post(
                  `${API_BASE_URL}/teste_proposta/upload_file/${propostaId}`,
                  formData,
                  {
                      headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                  }
              );

              console.log('Documento enviado:', docResponse.data);
              
          } catch (docError) {
              console.error('Erro ao enviar documento:', docError);
          }
          console.log(formData.get("file"))
      }

      alert("Proposta e arquivos enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar proposta ou arquivos:", error);
      alert("Erro ao enviar proposta ou arquivos. Tente novamente.");
    }
  };

  const funcs = [handle_info_empresa, handle_docs];

  return (
    <div className="box">
      <form>
        {steps.map((step: any, i: number) => render_step(step, i, funcs[i]))}
        <footer className="buttons">
          <button className="btn btn-warning" onClick={handle_submit}>
            Enviar proposta
          </button>
          <Link to={"/"}>
            <button className="btn btn-secondary">Sair</button>
          </Link>
        </footer>
      </form>
    </div>
  );
}

export default SegmentoInvestimentos;