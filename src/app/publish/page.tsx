import Image from "next/image";
import styles from "@/app/page.module.css";
import Publish from "@/app/components/Publish";

export default function PostArticles() {
  return (
    <>
      <div className="container mt-5">
        <Publish />
      </div>
    </>
  );
}
