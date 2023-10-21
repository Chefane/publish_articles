import Image from "next/image";
import styles from "@/app/page.module.css";
import Summary from "@/app/components/Summary";
import AuthorNav from "@/app/components/AuthorNav";

export default function PostArticles() {
  return (
    <>
    <AuthorNav/>
      <div className="container mt-5">
        <Summary/>
      </div>
    </>
  );
}
