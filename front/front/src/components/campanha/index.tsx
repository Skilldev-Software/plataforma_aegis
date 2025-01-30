import style from "./campanha.module.css"

interface CampanhaProps {
    img: string; 
    regras: string;
    titulo: string;
  }

export default function Campanha({ img, regras, titulo }: CampanhaProps){
    return(
    <article className={style.campanha}>
        <div><img src={img} alt="" className={style.imgCampanha} /></div>

        <h3>{titulo}</h3>
        <p>{regras}</p>
    </article>)
}