import "./styles.scss";

type Props = {
  name: string;
  avatar: string;
};

export function UserInfo({ name, avatar }: Props) {
  return (
    <div className="user-info">
      <img src={avatar} alt={name} referrerPolicy="no-referrer" />
      <span>{name}</span>
    </div>
  );
}
