import { useState, useEffect } from 'react';
import Sidemenu from "../../components/Sidemenu";
import Header from "../../components/Header";
import style from './campanhas.module.css';
import Campanha from "../../components/campanha";
import axios from 'axios';
import { API_BASE_URL } from '../../config';

export default function Campanhas() {
    interface Campanha {
        id: number;
        imagem: string;
        titulo: string;
        descricao: string;
    }

    const [isSidemenuVisible, setIsSidemenuVisible] = useState(false);
    const [campanhas, setCampanhas] = useState<Campanha[]>([]);

    // Função para buscar as campanhas do back-end
    useEffect(() => {
        const fetchCampanhas = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/campanhas_promocionais/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCampanhas(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Erro ao buscar campanhas:', error);
            }
        };
        fetchCampanhas();
    }, []);

    const toggleSidemenu = () => {
        setIsSidemenuVisible((prevState) => !prevState);
    };

    return (
        <div className={style.main}>
            <Header onToggleSidemenu={toggleSidemenu} />
            <div>
                <Sidemenu pagAtual={"Campanhas"} visible={isSidemenuVisible} />
                <main className={style.kitComercial}>
                    <h2>Campanhas</h2>
                    <p>Confira todas as nossas campanhas que estão acontecendo e as que já passaram</p>
                    <hr className={style.linha} />
                    <section className={style.conteudo}>
                    {campanhas.length > 0 ? (
                    campanhas.map((campanha) => (
                        <Campanha
                        key={campanha.id}
                        img={`${campanha.imagem}`} // Ajuste do caminho da imagem
                        titulo={campanha.titulo}
                        regras={campanha.descricao}
                        />
                    ))
                    ) : (
                    <p>Nenhuma campanha encontrada no momento.</p>
                    )}
                    </section>
                </main>
            </div>
        </div>
    );
}
