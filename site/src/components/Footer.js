import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";


const Footer = () => {
 const router = useRouter();
 return (
   <>
     <div className={styles.footer}>
        © 2023 DormWiki
     </div>
   </>
 );
}
export default Footer;
