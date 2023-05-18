import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import { getEvent } from '../api/event';
import Link from "next/link";
import Navbar from '@/components/Navbar';

import event from '@/styles/Event.module.css';


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
        <title>{evt["name"]}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png" />
      </Head>
      <main className={event.main}>
        <Navbar />
        <section className={event.content}>
          <div className={event.title}>
            {evt["name"]}
          </div>
          <div className={event.description}>
            <div className={event.p}>
              Posted: {formatDate(evt["postDate"])}
            </div>
            <div className={event.p}>
              [PHOTOS]
            </div>
            <div className={event.subtitle}>
                Start time: {evt["startTime"]} <br/>
                Dorm: {evt["dorm_id"]}, location: {evt["location"]}
                <br/> 
            </div>
            <div className={event.subtitle}>
              <i>Organizer: {evt["organizer"]}</i>
            </div>
            <div className={event.p}>
              [insert event description]
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

function formatDate(string) {
  let format = new Date(string).toLocaleString();

  // mm/dd/year
  let date = format.split(", ")[0];
  // AM or PM
  let timeFormat = format.split(", ")[1].split(" ")[1];
  // xx:xx
  let time = format.split(", ")[1].split(" ")[0].split(":").slice(0, -1).join(":");
  return `${date}, ${time} ${timeFormat}`;
}
