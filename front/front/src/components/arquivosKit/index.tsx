import style from "./arquivosKit.module.css";
import { BsFileEarmarkTextFill } from "react-icons/bs";

interface ArquivosKitProps {
  arquivo: string;  
  link: string;     
//   nomeArquivo: string; 
}

export default function ArquivosKit({ arquivo, link }: ArquivosKitProps) {
  return (
    <article className={style.arquivo}>
      <div className={style.icon}>
        <BsFileEarmarkTextFill className={style.iconFile} />
      </div>
      <h3>
        <a className={style.tituloArquivo} href={link} target="_blank" rel="noopener noreferrer">
          {arquivo}
        </a>
      </h3>
    </article>
  );
}
