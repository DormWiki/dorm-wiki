import styles from "@/styles/Sidebar.module.css";
import Link from "next/link";
import { cleanName } from "@/misc";
let DORMS = [
  "alder-hall",
  "elm-hall",
  "hansee-hall",
  "lander-hall",
  "madrona-hall",
  "maple-hall",
  "mccarty-hall",
  "mcmahon-hall",
  "oak-hall",
  "poplar-hall",
  "terry-hall",
  "willow-hall",
  "mercer-court",
  "stevens-court",
  "cedar-apartments",
  "commodore-duchess",
  "nordheim-court",
  "radford-court",
  "blakeley-village",
  "laurel-village"
];
const genLinks = (select) => {
  let ret = [];
  DORMS.forEach((dorm) => {
    if(dorm === select) {
      ret.push(
        <>
          <Link className={styles.selected} href={`/wiki/dorms/${dorm}`}>
            {cleanName(dorm)}
          </Link>
        </>
      );
    } else {
      ret.push(
        <>
          <Link href={`/wiki/dorms/${dorm}`}>
            {cleanName(dorm)}
          </Link>
        </>
      );
    }
  })
  return ret;
}

const Sidebar = ({selected}) => {
  return (
    <>
      <div className={styles.sidebar}>{genLinks(selected)}</div>
    </>
  );
};

export default Sidebar;

