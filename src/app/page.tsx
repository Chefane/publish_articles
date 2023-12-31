import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navigation";
import ArticleCard from "@/app/components/ArticleCard";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />

      <ArticleCard />
    </>
  );
};

export default Home;
