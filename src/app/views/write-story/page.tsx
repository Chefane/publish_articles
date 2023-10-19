import Image from "next/image";
import styles from "@/app/page.module.css";
import Summary from "@/app/components/Summary";

export default function PostArticles() {
  return (
    <>
      <div className="container mt-5">
        <Summary/>
      </div>
    </>
  );
}
