import Navbar from "../components/Navbar";
import styles from "@/app/page.module.css";
import LoginForm from "../components/LoginForm";

export default function Login() {
    return  <>
    <Navbar/>
     <main className={styles.main}>
    <LoginForm/>
   </main>
   </>
  }