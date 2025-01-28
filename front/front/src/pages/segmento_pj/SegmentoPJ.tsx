import React, { useState } from 'react';
import { Link } from 'react-router';
import { steps } from "./SegmentoPJSteps";
import { render_step } from "./SegmentoPJFunctions";
import axios from 'axios';
import './SegmentoPJ.css';

function SegmentoPj() {
    const [infoEmpresa, setInfoEmpresa] = useState({});
    const [infoGarantia, setGarantia] = useState({});
    const [infoFaturamento, setFaturamento] = useState({});
    const [infoDivida, setDivida] = useState({});
    const [docs, setDocs] = useState<File[]>([]); // Alterado para lidar com arquivos

    const handle_info_empresa = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInfoEmpresa((prevData) => ({ ...prevData, [name]: value }));
    };

    const handle_info_garantia = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setGarantia((prevData) => ({ ...prevData, [name]: value }));
    };

    const handle_info_faturamento = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFaturamento((prevData) => ({ ...prevData, [name]: value }));
    };

    const handle_info_divida = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDivida((prevData) => ({ ...prevData, [name]: value }));
    };

    const handle_docs = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDocs((prevDocs) => [...prevDocs, ...Array.from(e.target.files)]);
        }
    };

    const handle_submit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(docs)

        const username = localStorage.getItem('username') || "Desconhecido";

        const data = {
            "p_base": {
                "nome_proposta": infoEmpresa.nome,
                "segmento": "pj",
                "status": "Nova Proposta"
            },
            "empresa": infoEmpresa,
            "garantias": infoGarantia,
            "faturamento": infoFaturamento,
            "dividas": infoDivida
        };
        for (let key in data.dividas) {
            if (data.dividas.hasOwnProperty(key)) {
              data.dividas[key] = Number(data.dividas[key]);
            }
          }

          if (data.empresa.balanco_auditado === "sim") {
            data.empresa.balanco_auditado = true;
          } else if (data.empresa.balanco_auditado === "nao") {
            data.empresa.balanco_auditado = false;
          }
          
          if (data.empresa.recuperacao_judicial === "sim") {
            data.empresa.recuperacao_judicial = true;
          } else if (data.empresa.recuperacao_judicial === "nao") {
            data.empresa.recuperacao_judicial = false;
          }
        try {
            // Primeiro POST para criar a proposta
            const response = await axios.post(
                'http://127.0.0.1:8000/teste_proposta/create_list',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            const propostaId = response.data.sucesso.id; // Obtém o ID retornado
            
            const bitrixData = {
                fields: {
                  TITLE: data.p_base.nome_proposta,
                  STATUS_ID: "NEW",
                  NAME: username,
                  COMPANY_TITLE: infoEmpresa.nome || "Empresa não informada",
                  COMMENTS:`
                    Originador: ${username}
                    Segmento: OUTRO,

                    Nome da empresa: ${infoEmpresa.nome || "N/A"},
                    CNPJ da empresa: ${infoEmpresa.cnpj || "N/A"},
                    Site da empresa: ${infoEmpresa.site || "N/A"},
                    Email da empresa: ${infoEmpresa.email || "N/A"},
                    Contato da empresa: ${infoEmpresa.contato || "N/A"},
                    Fale sobre a empresa e a proposta: ${infoEmpresa.coments || "N/A"},

                    A empresa está em recuperação judicial?: ${infoEmpresa.recuperacao_judicial || "N/A"},
                    A empresa possui balanço auditado?: ${infoEmpresa.balanco_auditado || "N/A"},
                    Tipo de operação da empresa: ${infoEmpresa.tipo_operacao || "N/A"},
                    Setor de atuação da empresa: ${infoEmpresa.setor_atuacao || "N/A"},

                    Garantias disponíveis: ${infoGarantia.disponiveis || "N/A"},
                    Valor das garantias disponíveis: ${infoGarantia.valor || "N/A"},

                    Faturamento 2022: ${infoFaturamento.faturamento_2022 || "N/A"},
                    Faturamento 2023: ${infoFaturamento.faturamento_2023 || "N/A"},
                    Faturamento 2024: ${infoFaturamento.faturamento_2024 || "N/A"},

                    Qual o valor total das dívidas: ${infoDivida.valor_total || "N/A"},
                    Dívida tributária: ${infoDivida.div_tributaria || "N/A"},
                    Dívida bancária: ${infoDivida.div_bancaria || "N/A"},
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
                        `http://127.0.0.1:8000/teste_proposta/upload_file/${propostaId}`,
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

            alert('Proposta e documentos enviados com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar proposta:', error);
            alert('Erro ao enviar proposta. Tente novamente.');
        }
    };

    const handles = [handle_info_empresa, handle_info_garantia, handle_info_faturamento, handle_info_divida, handle_docs];

    return (
        <div className="box">
            <form className="formSeg">
                {steps.map((step: any, i: number) => (
                    render_step(step, i, handles[i])
                ))}

                

                <footer className="buttons">
                    <button
                        className="btn btn-warning"
                        onClick={handle_submit}
                    >
                        Enviar proposta
                    </button>
                    <Link to={"/"}>
                        <button className="btn btn-secondary">
                            Sair
                        </button>
                    </Link>
                </footer>
            </form>
        </div>
    );
}

export default SegmentoPj;