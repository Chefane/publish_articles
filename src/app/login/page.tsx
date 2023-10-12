import Navbar from "../components/Navigation";
import styles from "@/app/page.module.css";
import LoginForm from "../components/LoginForm";

export default function Login() {
    return  <>
    <Navbar/>
    <div className="container fluid" style={{marginTop: "10%"}}>
    <LoginForm/>
   </div>
   </>
  }