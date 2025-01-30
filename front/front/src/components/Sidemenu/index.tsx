import styles from './sidemenu.module.css';
import SidemenuItem from '../SidemenuItem/index';
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { BsEnvelopeArrowUpFill } from "react-icons/bs";
import { BsBriefcaseFill } from "react-icons/bs";
import { BsFillFolderFill } from "react-icons/bs";
import { BsFillMortarboardFill } from "react-icons/bs";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

interface SidemenuProps {
  pagAtual: string;  // A página atual (nome ou identificador)
  visible: boolean;  // Indica se o menu está visível
}

export default function Sidemenu({ pagAtual, visible }: SidemenuProps) {
  const minWidth = visible ? styles.sidemenu : styles.hiddenSidemenu;
  console.log(minWidth);

  return (
    <aside className={minWidth}>
      <Link to={'/'}><SidemenuItem item={"Home"} ativo={pagAtual} visible={visible} tag={<BsFillGrid1X2Fill />} /></Link>
      <Link to={'/nova-proposta'}><SidemenuItem item={"Nova Operação"} ativo={pagAtual} visible={visible} tag={<BsEnvelopeArrowUpFill />} /></Link>
      <Link to={'/acompanhamento'}><SidemenuItem item={"Minhas operações"} ativo={pagAtual} visible={visible} tag={<BsBriefcaseFill />} /></Link>
      <Link to={'/kitComercial'}><SidemenuItem item={"Kit Comercial"} ativo={pagAtual} visible={visible} tag={<BsFillFolderFill />} /></Link>
      <Link to={'/academy'}><SidemenuItem item={"Academy"} ativo={pagAtual} visible={visible} tag={<BsFillMortarboardFill />} /></Link>
      <Link to={'/campanha'}><SidemenuItem item={"Campanhas"} ativo={pagAtual} visible={visible} tag={<BsFillMegaphoneFill />} /></Link>
    </aside>
  );
}