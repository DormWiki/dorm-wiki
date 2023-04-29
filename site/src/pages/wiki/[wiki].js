import Head from 'next/head';
import React, { useState } from 'react';

import { useRouter } from "next/router";
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css'
import wiki from '@/styles/Wiki.module.css';
import Link from "next/link";
import { useEffect } from 'react';
import ReactStars from "react-stars";
import CustomCarousel from "../../components/Carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function Wiki( {info} ) {
  const router = useRouter();
  const dorm = router.query.wiki;
   
  let s_index = 0;

  return (
    <>
      <Head>
        <title>{dorm}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-dorm-wiki.svg" />
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
          <div className={styles.logo}>
            <img src="/dorm-wiki-logo.png"></img>
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
          <CustomCarousel dorm={"maple-hall"} />
          <div className={wiki.description}>
            <h3> Information </h3>
            <p>{info["maple-hall"]["description"]}</p>
          </div>
          <span className={wiki.review_box}>
            <div className={wiki.review}>
              <div className={wiki.review_text}>
                <h2>Anonymous</h2>
                <h3 className={wiki.subtitle}>
                  {info["maple-hall"]["reviews"]["12512"]["date"]}
                </h3>
                <h3> Cool dorm! </h3>
                <p>{info["maple-hall"]["reviews"]["12512"]["text"]}</p>
              </div>
              <div className={wiki.review_rating}>
                <ReactStars
                  edit={false}
                  starCount={5}
                  value={info["maple-hall"]["reviews"]["12512"]["rating"]}
                  size={36}
                  color2={"#ffd700"}
                />
              </div>
            </div>
            <div className={wiki.review}>
              <div className={wiki.review_text}>
                <h2>Anonymous</h2>
                <h3 className={wiki.subtitle}>
                  {info["maple-hall"]["reviews"]["12512"]["date"]}
                </h3>
                <h3> Cool dorm! </h3>
                <p>{info["maple-hall"]["reviews"]["12512"]["text"]}</p>
              </div>
              <div className={wiki.review_rating}>
                <ReactStars
                  edit={false}
                  starCount={5}
                  value={info["maple-hall"]["reviews"]["12512"]["rating"]}
                  size={36}
                  color2={"#ffd700"}
                />
              </div>
            </div>
            <div className={wiki.review}>
              <div className={wiki.review_text}>
                <h2>Anonymous</h2>
                <h3 className={wiki.subtitle}>
                  {info["maple-hall"]["reviews"]["12512"]["date"]}
                </h3>
                <h3> Cool dorm! </h3>
                <p>{info["maple-hall"]["reviews"]["12512"]["text"]}</p>
              </div>
              <div className={wiki.review_rating}>
                <ReactStars
                  edit={false}
                  starCount={5}
                  value={info["maple-hall"]["reviews"]["12512"]["rating"]}
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
    fallback: false,
  };
}
