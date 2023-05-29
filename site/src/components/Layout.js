import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <section className={styles.main}>
        <section className={styles.content}>
          {children}
        </section>
      </section>
      <Footer />
    </>
  );
}
