import Sidemenu from "../../components/Sidemenu";
import Header from "../../components/Header";
import style from './kitComercial.module.css';
import ArquivoKit from "../../components/arquivosKit";
import axios from 'axios';

import  { useState, useEffect } from 'react';

export default function kitComercial(){
   
    

    const [isSidemenuVisible, setIsSidemenuVisible] = useState(false);
    const [documents, setDocuments] = useState([]);

    const toggleSidemenu = () => {
        setIsSidemenuVisible(prevState => !prevState)
        console.log(isSidemenuVisible)
      };

      // Função para buscar documentos do backend
        useEffect(() => {
            const fetchDocuments = async () => {
                try {
                    console.log(localStorage.getItem('authToken'))
                    const response = await axios.get('http://127.0.0.1:8000/kit_comercial/documento/', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setDocuments(response.data);
                } catch (error) {
                    console.error('Erro ao buscar documentos:', error);
                }
            };

            fetchDocuments();
        }, []);
    

    return (
        <div className={style.main}>
            <Header onToggleSidemenu={toggleSidemenu}/>
            <div>
                <Sidemenu pagAtual={"Kit Comercial"} visible={isSidemenuVisible}/>
                <main className={style.kitComercial}>
                    
                    <h2>Arquivos Úteis</h2>
                    <p>Clique no título do card para acessar o respectivo arquivo</p>
                    <hr className={style.linha} />
                    <section className={style.conteudo}>
                        {/* Renderiza os documentos do backend */}
                        {documents.map(doc => (
                            <ArquivoKit
                                key={doc.id}
                                arquivo={doc.titulo}
                                link={doc.arquivo_pdf}
                                nomeArquivo={doc.titulo}
                            />
                        ))}
                    </section>

                </main>
            </div>
            
        </div>
    );
}

