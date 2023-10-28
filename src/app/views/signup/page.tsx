"use client"
import Navbar from "@/app/components/Navigation";
import Image from 'next/image'
import styles from '@/app/page.module.css';
import SignupForm from "@/app/components/SignupForm";



export default function Signup() {
  return <>
    <Navbar />
    <div className="container fluid" style={{marginTop: "10%"}}>
      <SignupForm />
    </div>
  </>

}