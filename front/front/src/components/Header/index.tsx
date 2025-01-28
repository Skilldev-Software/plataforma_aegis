import styles from './header.module.css'
import { useEffect, useState } from 'react';
import { BsBellFill} from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import  Perfil  from "../../assets/Profile.png"
import Logout from "../../assets/logout.png"
import { useNavigate } from "react-router-dom"; 
import { Link } from 'react-router'
// Placeholder caso a imagem não esteja disponível


export default function Header({ onToggleSidemenu }) {
  const [headerMenu, toggleHeaderMenu] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const username = localStorage.getItem("username") || "Usuário";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserImage(data.Imagem || null);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className={styles.header}>
      <div>
        <span className={styles.menu}>
          <FiMenu className={styles.icons} onClick={onToggleSidemenu} />
        </span>
        <h1>AÉGIS CAPITAL</h1>
      </div>
      <div>
        <Link to="/perfil">
          <span style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}>
            <div className={styles.infosuser}>
              <h3>{username}</h3>
              <span>Broker</span>
            </div>
            <img
              src={userImage || Perfil}
              alt="Perfil"
              className={styles.userImage}
            />
          </span>
        </Link>
        <img
          className={styles.clickable}
          src={Logout}
          alt="Logout"
          onClick={handleLogout}
        />
      </div>
    </header>
  );
}
