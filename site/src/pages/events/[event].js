import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from '@/components/Navbar';

import styles from '@/styles/Home.module.css';
import event from '@/styles/Event.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export  default function Event() {
  const router = useRouter();
  const event_id = router.query.event;
  console.log(event_id);
  const info = getEvents();
  if ()
  let event = info.forEach((dict) => {
    if (dict["_id"] === event_id){
      return dict;
    }
  });
  
  return (
    <>
      <Head>
        <title>{event}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <section className={events.content}>
          <div className={event.title}>
            {event["_id"]}
          </div>
          <div className={events.dscription}>
            <div className={event.p}>
              {event["postDate"]}
            </div>
            <div className={event.p}>
              [PHOTOS]
            </div>
            <div className={event.subtitle}>
                Start time: [TIME] 
                Dorm: [DORM], Location: [LOCATION]
                <br/> 
            </div>
            <h3>
              <i>Organizer: [NAME]</i>
            </h3>
            <div className={event.p}>
              [DESCRIPTION]
            </div>
          </div>
          <div className={event.button}>
            <button type="button">
              Save to your events
            </button>
          </div>
        </section>
      </main>
  </>
);
}

async function getEvents() {
  const res = await fetch("http://localhost:5050/getUpcomingEvents");

  if (!res.ok) {
      throw new Error('fetch fail');
  }
  let ret = [];
  const info = await res.json();
  for (let item in info) {
    ret.push(item);
  }
  return ret;
}
