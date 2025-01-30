import React, { useState } from "react";
import { Link } from "react-router";
import { steps } from "./SegmentoInternacionalSteps";
import { render_step } from "./SegmentoInternacionalFunctions";
import "./SegmentoInternacional.css";
import axios from 'axios';
import { API_BASE_URL } from "../../config";

function SegmentoInternacional() {
  interface Empresa {
    nome: string,
    cnpj: string,	
    site: string,
    email: string,
    contato: string,
    coments: string,
    recuperacao_judicial: boolean,
    balanco_auditado: boolean,
    tipo_operacao: string,
    setor_atuacao: string
  };

  interface Garantia {
      disponiveis: string,
      valor: string
  };

  interface Faturamento {
      faturamento_2022: string,
      faturamento_2023: string,
      faturamento_2024: string
  };

  interface Divida {
    valor_total: string;
    div_tributaria: string;
    div_bancaria: string;
    [key: string]: string;
  }

  const [infoEmpresa, setInfoEmpresa] = useState<Empresa | null>(null);
  const [infoGarantia, setGarantia] = useState<Garantia | null>(null);
  const [infoFaturamento, setFaturamento] = useState<Faturamento | null>(null);
  const [infoDivida, setDivida] = useState<Divida | null>(null);

  const [docs, setDocs] = useState<File[]>([]);

  const handle_info_empresa = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfoEmpresa((prevData) => {  
      if (prevData) {
        return { ...prevData, [name]: value };
      }
      return prevData;
    });
  };

  const handle_info_garantia = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGarantia((prevData) => {  
      if (prevData) {
        return { ...prevData, [name]: value };
      }
      return prevData;
    });
  };

  const handle_info_faturamento = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFaturamento((prevData) => {  
      if (prevData) {
        return { ...prevData, [name]: value };
      }
      return prevData;
    });
  };

  const handle_info_divida = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDivida((prevData) => {  
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
        originador: 1, // ID do usuário no back-end
        nome_proposta: infoEmpresa?.nome,
        segmento: "internacional",
        status: "Nova Proposta",
      },
      empresa: infoEmpresa,
      garantias: infoGarantia,
      faturamento: infoFaturamento,
      dividas: infoDivida,
    };

    for (let key in data.dividas) {
      if (data.dividas.hasOwnProperty(key)) {
        data.dividas[key] = (data.dividas[key]);
      }
    }

    if (data.empresa?.balanco_auditado === true) {
      data.empresa.balanco_auditado = true;
    } else if (data.empresa?.balanco_auditado === false) {
      data.empresa.balanco_auditado = false;
    }
    
    if (data.empresa?.recuperacao_judicial === true) {
      data.empresa.recuperacao_judicial = true;
    } else if (data.empresa?.recuperacao_judicial === false) {
      data.empresa.recuperacao_judicial = false;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/teste_proposta/create_list`, // Endpoint da sua API
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const propostaId = response.data.sucesso.id; // Captura o ID retornado

      // Enviar dados ao Bitrix24 via webhook
      const bitrixData = {
        fields: {
          TITLE: data.p_base.nome_proposta,
          STATUS_ID: "NEW",
          NAME: username,
          COMPANY_TITLE: infoEmpresa?.nome || "Empresa não informada",
          COMMENTS:`
            Originador: ${username}
            Segmento: INTERNACIONAL,

            Nome da empresa: ${infoEmpresa?.nome || "N/A"},
            CNPJ da empresa: ${infoEmpresa?.cnpj || "N/A"},
            Site da empresa: ${infoEmpresa?.site || "N/A"},
            Email da empresa: ${infoEmpresa?.email || "N/A"},
            Contato da empresa: ${infoEmpresa?.contato || "N/A"},
            Fale sobre a empresa e a proposta: ${infoEmpresa?.coments || "N/A"},

            A empresa está em recuperação judicial?: ${infoEmpresa?.recuperacao_judicial || "N/A"},
            A empresa possui balanço auditado?: ${infoEmpresa?.balanco_auditado || "N/A"},
            Setor de atuação da empresa: ${infoEmpresa?.setor_atuacao || "N/A"},

            Garantias disponíveis: ${infoGarantia?.disponiveis || "N/A"},
            Valor das garantias disponíveis: R$ ${infoGarantia?.valor || "N/A"},

            Faturamento 2022: R$ ${infoFaturamento?.faturamento_2022 || "N/A"},
            Faturamento 2023: R$ ${infoFaturamento?.faturamento_2023 || "N/A"},
            Faturamento 2024: R$ ${infoFaturamento?.faturamento_2024 || "N/A"},

            Qual o valor total das dívidas: R$ ${infoDivida?.valor_total || "N/A"},
            Dívida tributária: R$ ${infoDivida?.div_tributaria || "N/A"},
            Dívida bancária: R$ ${infoDivida?.div_bancaria || "N/A"},
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
        console.log(propostaId)
        try {
            const docResponse = await axios.post(
                `${API_BASE_URL}/teste_proposta/upload_file/${propostaId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
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

  const handles = [handle_info_empresa, handle_info_garantia, handle_info_faturamento, handle_info_divida, handle_docs];

  return (
    <div className="box">
      <form className="form-segmento">
        {steps.map((step: any, i: number) => render_step(step, i, handles[i]))}

        <div style={{display: "none"}} className="form-group">
          <label htmlFor="docs">Anexar Documentos:</label>
          <input
            type="file"
            id="docs"
            multiple
            onChange={handle_docs}
          />
        </div>

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

export default SegmentoInternacional;