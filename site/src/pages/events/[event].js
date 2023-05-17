import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import { getEvent } from '../api/event';
import Link from "next/link";
import Navbar from '@/components/Navbar';

import styles from '@/styles/Home.module.css';
import event from '@/styles/Event.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export  default function Event({ info, id }) {
  let event = [];
  for (let i = 0; i < info.length; i++) {
    if (parseInt(info[i]["_id"]) === parseInt(id)) {
      event = info[i];
    }
  }
  return (
    <>
      <Head>
        <title>{event["title"]}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <section className={event.content}>
          <div className={event.title}>
            {event["_id"]}
          </div>
          <div className={event.dscription}>
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


export async function getServerSideProps(context) {
  let id = context.params.event;
  const info = await getEvent();
  return {
    props: {
      info,
      id
    }, // will be passed to the page component as props
  };
}
