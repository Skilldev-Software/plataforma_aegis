import style from "./videoKit.module.css"

interface VideoProps {
    titulo: string;
    // descricao: string;
    url: string;
    onOpenModal: () => void;
}

export default function VideoKit({ titulo, url, onOpenModal }: VideoProps) {
    return (
        <article className={style.video}>
            <iframe 
                className={style.thumb}
                src={url}
                title={titulo}>
            </iframe>
            <div className={style.desc}>
                <div>
                    <h4>{titulo}</h4>
                    <span className={style.descTime}>00:00</span>
                </div>
                <button onClick={onOpenModal} className={style.assistirBtn}>Assistir</button>
            </div>
        </article>
    );
}