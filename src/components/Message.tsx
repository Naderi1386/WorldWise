import styles from "./Message.module.css";
interface MessagePropType{
  message:string
}

function Message({ message }:MessagePropType) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
