import styles from "@/styles/Home.module.css";
import wiki from "@/styles/Wiki.module.css";
import Link from "next/link";
const Sidebar = () => {
  return (
    <>
      <div className={styles.sidebar}>
        <ul>
          <h2>North Campus</h2>
          <div className={styles.sidebar_sub}>
            <li>
              <Link href="/wiki/dorms/hansee-hall">Hansee Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/madrona-hall">Madrona Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/mccarty-hall">McCarty Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/mccahon-hall">McCahon Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/oak-hall">Oak Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/willow-hall">Willow Hall</Link>
            </li>
          </div>
          <h2>West Campus</h2>
          <div className={styles.sidebar_sub}>
            <li>
              <Link href="/wiki/dorms/alder-hall">Alder Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/elm-hall">Elm Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/lander-hall">Lander Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/maple-hall">Maple Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/poplar-hall">Poplar Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/terry-hall">Terry Hall</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/mercer-court">Mercer Court</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/stevens-court">Stevens Court</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/cedar-apartments">Cedar Apartments</Link>
            </li>
          </div>
          <h2>Off Campus</h2>
          <div className={styles.sidebar_sub}>
            <li>
              <Link href="/wiki/dorms/commodore-duchess">
                Commodore Duchess
              </Link>
            </li>
            <li>
              <Link href="/wiki/dorms/nordheim-court">Nordheim Court</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/radford-court">Radford Court</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/blakeley-village">Blakeley Village</Link>
            </li>
            <li>
              <Link href="/wiki/dorms/laurel-village">Laural Village</Link>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};


export default Sidebar;