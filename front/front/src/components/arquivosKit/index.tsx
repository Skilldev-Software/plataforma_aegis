import style from "./arquivosKit.module.css"
import ArquivoIcon from '../../assets/arquivo.svg'
import { BsFileEarmarkTextFill } from "react-icons/bs";

export default function ArquivosKit({arquivo, link, nomeArquivo}){
    return(<article className={style.arquivo}>
        <div className={style.icon} ><BsFileEarmarkTextFill className={style.iconFile}/></div>
        <h3><a className={style.tituloArquivo} href={link} target="_blank" >{arquivo}</a></h3>
    </article>)
}