import Image from 'next/image'
import styles from './page.module.css'
import Navbar from './components/Navbar'
import Articles from './components/Articles';

export default function Home() {
  return (
    <>
     <Navbar/>
      <main className={styles.main}>
      <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
        <Articles/>
        </div>
      </div>
    </div>
      
    </main>
    </>
  
  )
}
