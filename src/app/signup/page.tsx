import Navbar from "../components/Navbar";
import Image from 'next/image'
import styles from '@/app/page.module.css';
import SignupForm from "../components/SignupForm";



export default function Signup() {
  return <>
    <Navbar />
    <main className={styles.main}>
      <SignupForm />
    </main>
  </>

}