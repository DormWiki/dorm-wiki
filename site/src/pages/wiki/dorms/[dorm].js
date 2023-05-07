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
        <section className={styles.content}>
          <CustomCarousel dorm={dorm} />
          <div className={wiki.description}>
            <h3> Information </h3>
            <p>{info[0]["info"]["description"]}</p>
          </div>
          <span className={wiki.review_box}>
            <div className={wiki.review}>
              <div className={wiki.review_text}>
                <h2>Anonymous</h2>
                <h3 className={wiki.subtitle}>
                  {info[0]["info"]["review"]}
                </h3>
                <h3> Cool dorm! </h3>
                <p>{info[0]["info"]["review"]}</p>
              </div>
              <div className={wiki.review_rating}>
                <ReactStars
                  edit={false}
                  starCount={5}
                  value={0}
                  size={36}
                  color2={"#ffd700"}
                />
              </div>
            </div>
          </span>
        </section>
      </main>
    </>
  );
}


export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("http://localhost:5050/wiki?dorm=maple-hall")
    .then((res) =>
      res.json()
    );
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
      "/wiki/dorms/alder-hall",
      "/wiki/dorms/elm-hall",
      "/wiki/dorms/hansee-hall",
      "/wiki/dorms/lander-hall",
      "/wiki/dorms/madrona-hall",
      "/wiki/dorms/maple-hall",
      "/wiki/dorms/mccarty-hall",
      "/wiki/dorms/mccahon-hall",
      "/wiki/dorms/oak-hall",
      "/wiki/dorms/poplar-hall",
      "/wiki/dorms/terry-hall",
      "/wiki/dorms/willow-hall",
      "/wiki/dorms/mercer-court",
      "/wiki/dorms/stevens-court",
      "/wiki/dorms/cedar-apartments",
      "/wiki/dorms/commodore-duchess",
      "/wiki/dorms/nordheim-court",
      "/wiki/dorms/radford-court",
      "/wiki/dorms/blakeley-village",
      "/wiki/dorms/laurel-village",
      // Object variant:
    ],
    fallback: false,
  };
}
