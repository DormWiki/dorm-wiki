 import Link from "next/link";
 import { useRouter } from "next/router";

 import styles from "@/styles/Home.module.css";
 import wiki from "@/styles/Wiki.module.css";


 const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.navbar_logo_wrapper}>
        <Link href={"/"}>
          <img src="/dw-logo-navbar.png"></img>
        </Link>
      </div>
      <div className={styles.navbar}>
        <ul>
          <li>
            <Link a href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <div className={styles.dropdown}>
              <Link href="/wiki">Wiki</Link>
              <div className={styles.dropdown_text}>
                <Link href={{ pathname: "/wiki", query: { dorm: "residence" } }}>
                  Residence halls
                </Link>
                <Link href={{ pathname: "/wiki", query: { dorm: "academic" } }}>
                  Academic-year apartments
                </Link>
                <Link href={{ pathname: "/wiki", query: { dorm: "year" } }}>
                  Full-year apartments
                </Link>
                <Link href={{ pathname: "/wiki", query: { dorm: "family" } }}>
                  Family apartments
                </Link>
              </div>
            </div>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <button type="button" onClick={() => router.push("/login")}>
            Login
          </button>
        </ul>
      </div>
    </>
  );
 }
 export default Navbar;
 