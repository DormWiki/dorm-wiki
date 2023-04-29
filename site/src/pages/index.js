import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from "react";
import Events from './events';

import { useRouter } from "next/router";
import CustomCarousel from "../components/Carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

//const inter = Inter({ subsets: ['latin'] })aaa

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Dorm-Wiki</title>
        <meta name="description" content="Your go-to place for UW dorm info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png" />
      </Head>
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
      <main className={styles.main}>
        <div className={styles.content}>
          <div>
            <img
              style={{ height: "250px", width: "250px" }}
              src="/dw-logo-main.png"
            ></img>
          </div>
          <CustomCarousel dorm={"maple-hall"}/>
          <h2 className={styles.hrtitle}>Upcoming Events</h2>
          <div className={styles.upcoming_events}>
            <div className={styles.event_deck}>a</div>
            <div className={styles.event_deck}>a</div>
            <div className={styles.event_deck}>a</div>
            <div className={styles.event_deck}>a</div>
          </div>
        </div>
      </main>
    </>
  );
}
