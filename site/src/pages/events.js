import Head from 'next/head'
import React, { useState } from 'react';
import { useRouter } from "next/router";

import styles from '@/styles/Home.module.css'
import events from '@/styles/Events.module.css'
import Link from 'next/link'
import CustomCarousel from '@/components/Carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Events( {event_info} ) {
  const router = useRouter();
  
  var events_arr = [];

  for (var i = 1; i <= 5; i++) {
    events_arr.push(
        <span className={events.event_box}>
            <div className={events.event}>
                <div className={events.event_info}>
                    <h2>Event {i}</h2>
                    <h3 className={events.subtitle}>
                    Date, Location
                    </h3>
                    <p>Description.</p>
                </div>
            </div>
        </span>);
  }

  return (
    <>
       <Head>
        <title>Dorm-Wiki</title>
        <meta name="description" content="Your go-to place for UW dorm info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png"/>
        </Head>
        <div className={styles.navbar}>
        <ul>
            <li>
                <Link a href="/">Home</Link>
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
            <div className={styles.logo_side}>
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
        <main className={events.main}>
            <div className={styles.content}>
                <h2 className={events.title}>Trending</h2>
                <CustomCarousel dorm={"events"}/>
                <h2 className={events.title}>Upcoming</h2>
               {events_arr}
            </div>
        </main> 
    </>
  );
}
