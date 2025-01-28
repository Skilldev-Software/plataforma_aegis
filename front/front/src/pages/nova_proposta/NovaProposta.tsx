import { Link } from 'react-router';
import { FaHandshake, FaMoneyBill, FaGlobe, FaPiggyBank, FaBoxes, FaEllipsisH } from 'react-icons/fa';

import './NovaProposta.css'

function NovaProposta() {
  const segmentos = [
    {
      span: "PJ",
      link: "/nova-proposta/segmentoPj",
      icon: <FaHandshake />
    },
    // {
    //   span: "M&A",
    //   link: "",
    //   icon: <FaMoneyBill />
    // },
    {
      span: "Internacional",
      link: "/nova-proposta/segmentoInternacional",
      icon: <FaGlobe />
    },
    {
      span: "Investimentos",
      link: "/nova-proposta/segmentoInvestimentos",
      icon: <FaPiggyBank />
    },
    // {
    //   span: "Alternativos",
    //   link: "",
    //   icon: <FaBoxes />
    // },
    {
      span: "Outros",
      link: "/nova-proposta/segmentoOutros",
      icon: <FaEllipsisH />
    }
  ];

return (
  <div className='box'>
    <span>
      <p>Você tem uma operação nova? <strong>ENTÃO VAMOS PARA CIMA!</strong></p>
      <p><strong>Em qual setor ela se encaixa?</strong></p>
    </span>

    <div className='categorias'>
      {segmentos.map((seg, i) => (
        <div key={i} className="form-check">
          <Link className="link-offset-2 link-underline link-underline-opacity-0" to={seg.link}>
            <input type="radio" className="btn-check" name="options" id={`${i}`} />
            <label className="btn btn-warning" htmlFor={`${i}`}>
              {seg.icon} {seg.span}
            </label>
          </Link>
        </div>
      ))}
    </div>

    <footer>
      {/* <button className="btn btn-warning">Continuar</button> */}
      <Link to={"/"}><button className="btn btn-secondary">Sair </button></Link>
    </footer>

  </div>
)}

export default NovaProposta
