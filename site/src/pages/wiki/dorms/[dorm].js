import Head from 'next/head';
import React, { useState } from 'react';

import { useRouter } from "next/router";
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css'
import wiki from '@/styles/Wiki.module.css';
import Link from "next/link";
import ReactStars from "react-stars";
import CustomCarousel from "../../../components/Carousel";

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
              <Link href="/wiki">Wiki</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/search">Search</Link>
            </li>
          </ul>
          <button type="button">Login</button>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.logoside}>
            <img src="/dw-logo-side.png" style={{width:125}}></img>
          </div>
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
          <CustomCarousel dorm={dorm} />
          <div className={wiki.description}>
            <h3> Information </h3>
            <p>{info[dorm]["description"]}</p>
          </div>
          <span className={wiki.review_box}>
            <div className={wiki.review}>
              <div className={wiki.review_text}>
                <h2>Anonymous</h2>
                <h3 className={wiki.subtitle}>
                  {info[dorm]["reviews"]["12512"]["date"]}
                </h3>
                <h3> Cool dorm! </h3>
                <p>{info[dorm]["reviews"]["12512"]["text"]}</p>
              </div>
              <div className={wiki.review_rating}>
                <ReactStars
                  edit={false}
                  starCount={5}
                  value={info[dorm]["reviews"]["12512"]["rating"]}
                  size={36}
                  color2={"#ffd700"}
                />
              </div>
            </div>
            <div className={wiki.review}>
              <div className={wiki.review_text}>
                <h2>Anonymous</h2>
                <h3 className={wiki.subtitle}>
                  {info[dorm]["reviews"]["12512"]["date"]}
                </h3>
                <h3> Cool dorm! </h3>
                <p>{info[dorm]["reviews"]["12512"]["text"]}</p>
              </div>
              <div className={wiki.review_rating}>
                <ReactStars
                  edit={false}
                  starCount={5}
                  value={info[dorm]["reviews"]["12512"]["rating"]}
                  size={36}
                  color2={"#ffd700"}
                />
              </div>
            </div>
            <div className={wiki.review}>
              <div className={wiki.review_text}>
                <h2>Anonymous</h2>
                <h3 className={wiki.subtitle}>
                  {info[dorm]["reviews"]["12512"]["date"]}
                </h3>
                <h3> Cool dorm! </h3>
                <p>{info[dorm]["reviews"]["12512"]["text"]}</p>
              </div>
              <div className={wiki.review_rating}>
                <ReactStars
                  edit={false}
                  starCount={5}
                  value={info[dorm]["reviews"]["12512"]["rating"]}
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
  const res = await fetch("http://localhost:3000/info.json").then((res) =>
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
