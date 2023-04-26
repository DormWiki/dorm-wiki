import Head from 'next/head'
import { useRouter } from "next/router";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import wiki from '@/styles/Wiki.module.css'
import Link from "next/link";
import { useEffect } from 'react';
import { Slide } from "react-slideshow-image";

const inter = Inter({ subsets: ['latin'] })




export default function Wiki( {info} ) {
  const router = useRouter();
  const dorm = router.query.wiki;
   
  let s_index = 0;
  
  return (
    <>
      <Head>
        <title>{dorm}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-dorm-wiki.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
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
        <section className={styles.content}>
          {Slideshow()}
          <div className={wiki.description}>
            <p>{info["maple-hall"]["description"]}</p>
          </div>
          <div className={wiki.description}>
            <p>{info["maple-hall"]["reviews"]["12512"]["text"]}</p>
          </div>
        </section>
      </main>
    </>
  );
}
const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};

const slideImages = [
  {
    url: "public/maple-hall/maple-hall1.jpg",
    caption: "Slide 1",
  },
  {
    url: "public/maple-hall/maple-hall2.jpg",
    caption: "Slide 2",
  },
];
const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <span style={spanStyle}>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

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
