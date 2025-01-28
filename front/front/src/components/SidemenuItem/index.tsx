import style from './sidemenuItem.module.css'
import HomeIcon from '../../assets/default.png'

export default function SidemenuItem({item, ativo, visible, tag}){
    const divClasse = item === ativo ? style.itemAtivo : style.item;
    const iconClasse = item === ativo ? style.iconeAtivo : style.icon;
    const itemDesc = !visible ? "0px" : "150px"

    return(
        
        <div className={divClasse}>
            <div className={iconClasse}>
                {tag}
            </div>
            <span style={{  width: itemDesc, overflow: "hidden" , transition: "all .5s"}}>{item}</span>
        </div>
    )
}