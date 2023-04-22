import Head from 'next/head'
import { useRouter } from "next/router";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function Wiki( {info} ) {
  const router = useRouter()
  const dorm = router.query.wiki
  return (
    <>
      <Head>
        <title>{dorm}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-dorm-wiki.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.navbar}>
          <div id="logo">
            <img src="/dorm-wiki-logo.png"></img>
          </div>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#">Events</Link>
            </li>
            <li>
              <Link href="#">Wiki</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link href="#">Search</Link>
            </li>
          </ul>
          <button type="button">Login</button>
        </div>
        <div className={styles.sidebar}>
          <ul>
            <li>
              <Link href="#">Link</Link>
            </li>
            <li>
              <Link href="#">Link</Link>
            </li>
          </ul>
        </div>
        <div className={styles.content}>
          {info["maple-hall"]["description"]}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    "https://raw.githubusercontent.com/nikopermi/DormWiki/main/info.json"
  ).then((res) => res.json());
  console.log(res);
  const info = res;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      info
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      "/wiki/alder-hall",
      "/wiki/elm-hall",
      "/wiki/hansee-hall",
      "/wiki/lander-hall",
      "/wiki/madrona-hall",
      "/wiki/maple-hall",
      "/wiki/mccarty-hall",
      "/wiki/mccahon-hall",
      "/wiki/oak-hall",
      "/wiki/poplar-hall",
      "/wiki/terry-hall",
      "/wiki/willow-hall",
      "/wiki/mercer-court",
      "/wiki/stevens-court",
      "/wiki/cedar-apartments",
      "/wiki/commodore-duchess",
      "/wiki/nordheim-court",
      "/wiki/radford-court",
      "/wiki/blakeley-village",
      "/wiki/laurel-village",
      // Object variant:
    ],
    fallback: true,
  };
}
