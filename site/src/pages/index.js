import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import React, { useState } from "react";
import Events from './events';
import getInfo from "./events.js";
import { Component } from "react";
import ReactSearchBox from "react-search-box";
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
            <div className={styles.dropdown}>
              <Link href="/wiki">Wiki</Link>
              <div className={styles.dropdown_text}>
                <Link href="/wiki/residence-halls">Residence halls</Link>
                <Link href="/wiki/academic-apts">Academic-year apartments</Link>
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
        </ul>
        <button type="button">Login</button>
      </div>
      <main className={styles.main}>
        <div className={styles.main_content}>
          <div className={styles.big_logo}>
            <img
              style={{ height: "500px", width: "500px" }}
              src="/dw-logo-main.png"
            ></img>
          </div>

          <div className={styles.search_wrapper}>
            <input type="text"/>
            
          </div>
          <h2 className={styles.hrtitle}>Upcoming Events</h2>
          <div className={styles.upcoming_events}>
            {getInfo}
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
