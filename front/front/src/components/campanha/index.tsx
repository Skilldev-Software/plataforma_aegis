import style from "./campanha.module.css"
import ArquivoIcon from '../../assets/arquivo.svg'
import { BsFileEarmarkTextFill } from "react-icons/bs";

export default function Campanha({img, regras, titulo}){
    return(
    <article className={style.campanha}>
        <div><img src={img} alt="" className={style.imgCampanha} /></div>

        <h3>{titulo}</h3>
        <p>{regras}</p>
    </article>)
}