import Head from 'next/head'
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link'
import CustomCarousel from '@/components/Carousel';

import styles from '@/styles/Home.module.css'
import events from '@/styles/Events.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";


// return 4 closest events to today's date (inclusive)
function getClosestUpcomingEvents(date) {
    // return 
    // get todays date 
    // return 1 closest
    var closest = [];
    return closest;
}

function getUpcomingEvents(event_info) {
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
                        
                        <p>
                            Description. Description. Description. Description.
                            Description. Description.
                        </p>
                    </div>
                </div>
            </span>);
    }
    return events_arr;
}


export default function Events( {event_info} ) {
  const router = useRouter();
  var events_arr = getUpcomingEvents(event_info);

  return (
    <>
       <Head>
        <title>Dorm-Wiki</title>
        <meta name="description" content="Your go-to place for UW dorm info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png"/>
        </Head>
        <div className={styles.logo}>
        <div className={styles.navbar_logo_wrapper}>
            <img src="/dw-logo-navbar.png"></img>
        </div>
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
                <button type="button" onClick={() => router.push('/login')}>Login</button>
            </ul>
        </div>
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

export async function getStaticProps() {
    const res = await fetch("http://localhost:3000/event_info.json").then((res) =>
      res.json()
    );
    const event_info = res;
  
    return {
      props: {
        event_info
      },
    };
}

