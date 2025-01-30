import React, { useState } from "react";
import { Link } from "react-router-dom";
import { steps } from "./SegmentoOutrosSteps";
import { render_step } from "./SegmentoOutrosFunctions";
import axios from "axios";
import "./SegmentoOutros.css";
import { API_BASE_URL } from "../../config";

function SegmentoOutros() {
  interface Cliente {
    nome: string,
    email: string,
    contato: string,
    coments: string,
    tipo_cliente: string,
    tipo_operacao: string
  }

  const [infoCliente, setInfoCliente] = useState<Cliente | null>(null);
  const [docs, setDocs] = useState<File[]>([]);

  const handle_info_empresa = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        segmento: "outro",
        status: "Nova Proposta",
      },
      cliente: infoCliente,
    };

    try {
      // Envia a proposta principal e obtém o ID retornado
      const response = await axios.post(
        `${API_BASE_URL}/teste_proposta/create_list`, // Substitua pela URL real
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Remova se não for usar autenticação
          },
        }
      );

      // Envia os arquivos associados ao ID da proposta
      const propostaId = response.data.sucesso.id; // Obtém o ID retornado
      
      const bitrixData = {
        fields: {
          TITLE: data.p_base.nome_proposta,
          NAME: username,
          STATUS_ID: "NEW",
          COMPANY_TITLE: infoCliente?.nome || "Empresa não informada",
          COMMENTS: `
            Originador: ${username}
            Segmento: OUTRO,



            Nome do cliente: ${infoCliente?.nome || "N/A"},
            Email do cliente: ${infoCliente?.email || "N/A"},
            Contato do cliente (empresário ou financeiro): ${infoCliente?.contato || "N/A"},
            
            Proposta do cliente: ${infoCliente?.coments || "N/A"},
            Cliente é Pessoa Física ou Jurídica: ${infoCliente?.tipo_cliente === "fisica" ? "Pessoa Física" : "Pessoa Jurídica"},
            Tipo de operação: ${infoCliente?.tipo_operacao || "N/A"},

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
                      }
                  }
              );

              console.log('Documento enviado:', docResponse.data);
          } catch (docError) {
              console.error('Erro ao enviar documento:', docError);
          }
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
      <form onSubmit={handle_submit}>
        {steps.map((step, i) => render_step(step, i, funcs[i]))}

        <footer className="buttons">
          <button className="btn btn-warning" type="submit">
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

export default SegmentoOutros;
