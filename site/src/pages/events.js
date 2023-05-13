import Head from 'next/head'
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link'
import CustomCarousel from '@/components/Carousel';
import path from "path";
import styles from '@/styles/Home.module.css'
import events from '@/styles/Events.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../components/Navbar";

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


export default function Events({ events_info, images }) {
  const router = useRouter();
  var events_arr = getUpcomingEvents(events_info);

  return (
    <>
      <Head>
        <title>Dorm-Wiki</title>
        <meta name="description" content="Your go-to place for UW dorm info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png" />
      </Head>
      <Navbar />
      <main className={events.main}>
        <div className={styles.content}>
          <h2 className={events.title}>Trending</h2>
          <CustomCarousel paths={images}/>
          <h2 className={events.title}>Submit an Event</h2>
          <span className={events.event_box}>
            
            <div className={events.form}>
                <form method="post" action="http://localhost:5050/postEvent">
                <label>Event title: </label>
                <input type="text" name="name"/>
                <br />
                <label>Organizer: </label>
                <input type="text" name="organizer" />
                <br />
                <label>Location: </label>
                <input type="text" name="location" />
                <br />
                <input
                    type="hidden"
                    name="postDate"
                    value={new Date().toISOString()}
                />
                <label>Dorm: </label>
                <input type="text" name="dorm_id" />
                <br />
                <label>Date & Time: </label>
                <input type="datetime-local" name="startTime" />
                <br />
                <input type="submit" id="submit" value="Submit" style={{padding: 5}}/>
                </form>
            </div>
          </span>
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
    const fs = require("fs");

    const dir = path.resolve("./public", "events");

    const filenames = fs.readdirSync(dir);

    const images = filenames.map((name) => path.join("/", "events", name));
    return {
      props: {
        events_info,
        images
      },
    };
}

