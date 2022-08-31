import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/Button";
import { UserInfo } from "../../components/UserInfo";
import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import "./styles.scss";

export function NewRoom() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") return;

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="new-room">
      <aside>
        <div>
          <img
            src={illustrationImg}
            alt="Ilustração simbolizando a respostas"
          />

          <strong>Crie salas de Q&amp;A ao-vivo</strong>

          <p>Tire as dúvidas da sua audiência em tempo real</p>
        </div>
      </aside>

      <main>
        <div className="main-content">
          {user && <UserInfo name={user.name} avatar={user.avatar} />}

          <img src={logoImg} alt="letmeask" />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
