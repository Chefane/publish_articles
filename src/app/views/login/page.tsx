import Navbar from "@/app/components/Navigation";
import styles from "@/app/page.module.css";
import LoginForm from "@/app/components/LoginForm";

export default function Login() {
    return  <>
    <Navbar/>
    <div className="container fluid" style={{marginTop: "10%"}}>
    <LoginForm/>
   </div>
   </>
  }