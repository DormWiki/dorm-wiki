 import Link from "next/link";
 import { useRouter } from "next/router";

 import styles from "@/styles/Home.module.css";
 import { useSession, signIn, signOut } from "next-auth/react";

function checkLogin(data) {
  const router = useRouter();
  if (data) {
    return (
      <>
        <div className={styles.gmail_logo_wrapper}>
          <div onClick={() => router.push("/login")}>
            <img
              className={styles.gmail_logo}
              src={data.user.image}
              alt={`profile picture for ${data.user.name}`}
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <button type="button" onClick={() => router.push("/login")}>
          Login
        </button>
      </>
    );
  }
}

 const Navbar = () => {
  const { data: session } = useSession();
  const picture = checkLogin(session);
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
          {picture}
        </ul>
      </div>
    </>
  );
 }
 export default Navbar;
 