import { useState, useEffect } from "react";
import style from "./perfil.module.css";
import Header from "../../components/Header";
import Sidemenu from "../../components/Sidemenu";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";

export default function Perfil() {
  const [isSidemenuVisible, setIsSidemenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // Estado para mensagens de status

  const defaultImage = "/front/front/src/assets/fotoPerfil.png";

  // Lida com mudanças no input de imagem
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Upload da imagem do perfil
  const handleImageUpload = async (event) => {
    event.preventDefault();

    if (!image) {
      setUploadStatus("Por favor, selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", image);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://127.0.0.1:8000/api/profile_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadStatus("Imagem atualizada com sucesso!");
      console.log(response.data);
      // Atualiza o userData com a nova imagem
      setUserData((prevData) => ({
        ...prevData,
        Imagem: response.data.data.profile_image,
      }));
    } catch (error) {
      setUploadStatus("Erro ao atualizar a imagem.");
      console.error(error);
    }
  };

  // Alterna o estado do sidemenu
  const toggleSidemenu = () => {
    setIsSidemenuVisible((prevState) => !prevState);
  };

  // Alterna o modal de edição
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Alterna o modal de foto de perfil
  const openFile = () => {
    setIsOpenFile(!isOpenFile);
    setUploadStatus(""); // Limpa mensagens ao abrir o modal
  };

  // Envia os contatos do usuário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Telefone:", telefone);
    toggleModal();
  };

  // Carrega os dados do usuário
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={style.main}>
      <Header onToggleSidemenu={toggleSidemenu} />
      <div>
        <Sidemenu pagAtual={"Academy"} visible={isSidemenuVisible} />
        <main className={style.perfil}>
          {userData && (
            <>
              <article className={style.fotoPerfil}>
                <img
                  src={userData.Imagem ? userData.Imagem : defaultImage}
                  alt="Foto de perfil"
                />
                <button onClick={openFile} className={style.editaPerfil}>
                  Editar foto de perfil
                </button>
              </article>
              <section>
                <article
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className={style.infoPerfil}
                >
                  <h2>{userData.username}</h2>
                </article>

                <article className={style.infoPerfil}>
                  <h4 style={{ color: "#C4C4CC" }}>Contatos do broker</h4>
                  <div>
                    <div>
                      <span style={{ color: "#C4C4CC" }}>Email: </span>
                      {userData.Email}
                    </div>
                    <div>
                      <span style={{ color: "#C4C4CC" }}>Cpf: </span>
                      {userData.Cpf || "Não informado"}
                    </div>
                    <div>
                      <span style={{ color: "#C4C4CC" }}>
                        Data de Nascimento:{" "}
                      </span>
                      {userData["Data de Nascimento"] || "Não informado"}
                    </div>
                    <div>
                      <span style={{ color: "#C4C4CC" }}>Data de Cadastro: </span>
                      {userData["Data de Cadastro"] || "Não informado"}
                    </div>
                  </div>
                </article>
              </section>
            </>
          )}
        </main>
      </div>

      {/* Modal de Edição */}
      {isModalOpen && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h3>Editar Contatos</h3>
            <form className={style.form} onSubmit={handleSubmit}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Telefone:</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <button className={style.submitModal} type="submit">
                Salvar
              </button>
            </form>
            <button className={style.closeModal} onClick={toggleModal}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Foto de Perfil */}
      {isOpenFile && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h3>Clique na opção abaixo para escolher uma nova imagem</h3>
            <form className={style.form} onSubmit={handleImageUpload}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button className={style.submitProfile} type="submit">
                Salvar
              </button>
              {uploadStatus && <p>{uploadStatus}</p>}
            </form>
            <button className={style.closeModal} onClick={openFile}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
  