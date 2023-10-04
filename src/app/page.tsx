import Image from 'next/image'
import styles from './page.module.css'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <>
     <Navbar/>
      <main className={styles.main}>
      <h1>Published pages will appear here</h1>
    </main>
    </>
  
  )
}
