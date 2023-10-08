import Image from 'next/image'
import styles from '@/app/page.module.css';
import Publish from '@/app/components/Publish';

export default function PostArticles() {
  return (
    <>
  
      <main className={styles.publish}>
      <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
        <Publish/>
        </div>
      </div>
    </div>
      
    </main>
    </>
  
  )
}

