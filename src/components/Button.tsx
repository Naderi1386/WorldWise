import { ReactNode } from "react"
import styles from './Button.module.css'

interface ButtonPropType{
    children:ReactNode
    onClick:()=>void
    type:string
}

const Button = ({onClick,children,type}:ButtonPropType) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button