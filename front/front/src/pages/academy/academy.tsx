import style from "./academy.module.css"
import { useState, useEffect } from "react";
import VideoKit from "../../components/videoKit";
import Header from "../../components/Header"
import Sidemenu from "../../components/Sidemenu";
import axios from 'axios';
import { BsX } from "react-icons/bs";
import { API_BASE_URL } from "../../config";


export default function Academy(){
    interface Video {
        id: string;
        titulo: string;
        descricao: string;
        url: string;
    }

    const [isSidemenuVisible, setIsSidemenuVisible] = useState(false);
    const [videos, setVideos] = useState<Video[]>([]);
    const toggleSidemenu = () => {
        setIsSidemenuVisible(prevState => !prevState)
        console.log(isSidemenuVisible)
      };
      const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
      const [isModalVisible, setIsModalVisible] = useState(false);
      
      const handleOpenModal = (video: Video) => {
        setSelectedVideo(video);
        setIsModalVisible(true);
    };
      
      const handleCloseModal = () => {
          setIsModalVisible(false); // Fecha o modal
      };
      
        // Função para buscar as campanhas do back-end
useEffect(() => {
    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/academy/videos/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setVideos(response.data);
        } catch (error) {
            console.error('Erro ao buscar vídeos:', error);
        }
    };
    fetchVideos();
}, []);


    return(
        <>
            <Header onToggleSidemenu={toggleSidemenu}/>
            <div style={{ height: "100%", display: "flex", flexDirection: "column"}}>
                <Sidemenu pagAtual={"Academy"} visible={isSidemenuVisible}/>
                <main className={style.academy}>
                    <h2>Academy</h2>
                    <p>Aprenda e desenvolva-se com conteúdos criados por nossa equipe da Aegis </p>
                    <hr className={style.linha} />
                    <section className={style.conteudo}>
                        {videos.map((video) => (
                        <VideoKit
                            key={video.id}
                            titulo={video.titulo}
                            // descricao={video.descricao}
                            url={video.url}
                            onOpenModal={() => handleOpenModal(video)} 
                        />
                        ))}
                    </section>
                </main>
            </div>

            {isModalVisible && selectedVideo && (
    <div className={style.modal}>
        <div className={style.modalConteudo}>
            <span style={{ float: "right" , cursor: "pointer"}} onClick={handleCloseModal}><BsX /></span>
            <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.url.split('v=')[1]}`} // Extrai o id do vídeo
                className={style.RepVideo}
                title={selectedVideo.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    </div>
)}
        </>
    )
}