import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import { getEvent } from '../api/event';
import Link from "next/link";
import Navbar from '@/components/Navbar';

import event from '@/styles/Event.module.css';


export  default function Event({ info, id }) {
  let evt = [];
  for (let i = 0; i < info.length; i++) {
    if (parseInt(info[i]["_id"]) === parseInt(id)) {
      evt = info[i];
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
            <div className={event.subtitle}>
              <i>Posted {formatDate(evt["postDate"])}</i>
            </div>
            <img
              src="/events/events1.jpg"
              style={{ height: "500px", width: "700px"}}
            ></img>
            <div className={event.subtitle}>
                <b><u>Start time</u></b>: {formatDate(evt["startTime"])}
            </div>
            <div className={event.subtitle}>
                <b><u>Dorm/location</u></b>: {evt["dorm_id"]}, {evt["location"]}
            </div>
            <div className={event.subtitle}>
              <b><u>Organizer</u></b>: {evt["organizer"]} ([contact info])
            </div>
            <div className={event.p}>
              [insert event description]
            </div>
          </div>
          <div className={event.save_button}>
            <button type="button">
              <span>
                <img 
                  src="/bookmark.png"
                  style={{ height: "50px", width: "50px"}}>
                </img>
              </span> 
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

// Given a date, reformats it to be more readable
// E.g. 2023-06-13T00:24 --> 6/13/2023, 12:24 AM
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
