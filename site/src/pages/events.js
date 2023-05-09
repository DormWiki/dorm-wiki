import Head from 'next/head'
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link'
import CustomCarousel from '@/components/Carousel';

import styles from '@/styles/Home.module.css'
import events from '@/styles/Events.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";

function getInfo () {
    return "";
}

function getUpcomingEvents(events_info) {
    var events_arr = [];
    events_info.forEach((event) => {
        events_arr.push(
          <span className={events.event_box}>
            <div className={events.event}>
              <div className={events.event_info}>
                <h2>{event["name"]}</h2>
                <h3 className={events.subtitle}>
                  {event["startTime"]}, {event["location"]}
                </h3>
                <p>description missing</p>
                <Link href="/event">Link to event page</Link>
              </div>
            </div>
          </span>
        );
    });
    return events_arr;
}


export default function Events({ events_info }) {
  const router = useRouter();
  var events_arr = getUpcomingEvents(events_info);

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
                <form method="post" action="/api/postEvent">
                    <label>Name:</label>
                    <input type="text" name="name"/><br/>
                    <label>organizer:</label>
                    <input type="text" name="organizer"/><br/>
                    <label>Location:</label>
                    <input type="text" name="location"/><br/>
                    <input type="hidden" name="postDate" value={new Date().toISOString()}/>
                    <label>Dorm:</label>
                    <input type="text" name="dorm_id"/><br/>
                    <label>When</label>
                    <input type="datetime-local" name="startTime"/><br/>
                    <input type="submit" id="submit" value="Submit"/>
                </form>
                <h2 className={events.title}>Upcoming</h2>
                {events_arr}
            </div>
        </main> 
    </>
  );
}

export async function getStaticProps() {
    const res = await fetch("http://localhost:5050/getUpcomingEvents")
    if (!res.ok) {
        throw new Error('fetch fail');
    }
    const events_info = await res.json();
  
    return {
      props: {
        events_info
      },
    };
}

