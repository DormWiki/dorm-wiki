import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from "next/link";
import ReactStars from "react-stars";
import CustomCarousel from "../../../components/Carousel";
import styles from '@/styles/Home.module.css'
import wiki from '@/styles/Wiki.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function Wiki( {info} ) {
  const router = useRouter();
  const dorm = router.query.dorm;
  let data = info[0];
  let reviews = genReviews(data["review"]);
  return (
    <>
      <Head>
        <title>{dorm}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.navbar_logo_wrapper}>
          <img src="/dw-logo-navbar.png"></img>
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
                  <Link href="/wiki/residence-halls">Residence halls</Link>
                  <Link href="/wiki/academic-apts">
                    Academic-year apartments
                  </Link>
                  <Link href="/wiki/year-apts">Full-year apartments</Link>
                  <Link href="/wiki/family-apts">Family apartments</Link>
                </div>
              </div>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/search">Search</Link>
            </li>
            <button type="button" onClick={() => router.push("/login")}>Login</button>
          </ul>
        </div>
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
                <Link href="/wiki/dorms/maple-hall">
                 Maple Hall
                </Link>
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
                <Link href="/wiki/dorms/cedar-apartments">
                  Cedar Apartments
                </Link>
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
                <Link href="/wiki/dorms/blakeley-village">
                  Blakeley Village
                </Link>
              </li>
              <li>
                <Link href="/wiki/dorms/laurel-village">Laural Village</Link>
              </li>
            </div>
          </ul>
        </div>
        <section className={wiki.content}>
          <CustomCarousel dorm={dorm} />
          <div className={wiki.description}>
            <h3> Information </h3>
            <p>{info[0]["info"]["description"]}</p>
          </div>
          <div className={wiki.review_input}>
            <form method="post" action="http://localhost:5050/postReview">
              <label htmlFor="user">Name:</label>
              <input type="text" name="user"/><br/>
              <textarea type="text" name="text"/>
              <input type="hidden" name="date" value={new Date().toISOString()}/>
              <input type="number" name="rating" min="0" max="5"/>
              <input type="submit" id="submit" value="Submit"/>
              <input type="hidden" name="ID" value={dorm}/>
            </form>
          </div>
          <span className={wiki.review_box}>
            {reviews}
          </span>
        </section>
      </main>
    </>
  );
}


export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const pid = context.params.dorm;
  const res = await fetch(`http://localhost:5050/wiki?dorm=${pid}`);
  if (!res.ok) {
    throw new Error('fetch failed');
  }
  const info = await res.json();
  if (Object.keys(info).length === 0) {
    return { notFound: true };
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      info
    },
  };
}

function genReviews(reviews) {
  let rev_html = [];
  reviews.forEach((r) => {
    rev_html.push(
      <div className={wiki.review}>
        <div className={wiki.review_text}>
          <h2>{r["user"]}</h2>
          <h3 className={wiki.subtitle}>
            {r["date"]}
          </h3>
          <h3>short title missing</h3>
          <p>{r["text"]}</p>
        </div>
        <div className={wiki.review_rating}>
          <ReactStars
            edit={false}
            starCount={5}
            value={r["rating"]}
            size={36}
            color2={"#ffd700"}
          />
        </div>
      </div>
      );
  })
  return rev_html;
  
}

export async function getStaticPaths() {
  return {
    paths: [
      //"/wiki/dorms/alder-hall",
      //"/wiki/dorms/elm-hall",
      //"/wiki/dorms/hansee-hall",
      //"/wiki/dorms/lander-hall",
      //"/wiki/dorms/madrona-hall",
      "/wiki/dorms/maple-hall",
      //"/wiki/dorms/mccarty-hall",
      //"/wiki/dorms/mccahon-hall",
      //"/wiki/dorms/oak-hall",
      //"/wiki/dorms/poplar-hall",
      //"/wiki/dorms/terry-hall",
      //"/wiki/dorms/willow-hall",
      //"/wiki/dorms/mercer-court",
      //"/wiki/dorms/stevens-court",
      //"/wiki/dorms/cedar-apartments",
      //"/wiki/dorms/commodore-duchess",
      //"/wiki/dorms/nordheim-court",
      //"/wiki/dorms/radford-court",
      //"/wiki/dorms/blakeley-village",
      //"/wiki/dorms/laurel-village",
      // Object variant:
    ],
    fallback: false,
  };
}
