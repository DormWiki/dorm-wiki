import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
import Events from "./events";
import getInfo from "./events.js";
import { Component } from "react";
import { useRouter } from "next/router";
import CustomCarousel from "../components/Carousel";
import Navbar from "@/components/Navbar";
import ReactSearchBox from "react-search-box";
import { formatDate } from "@/misc";
import confetti from "canvas-confetti";
import Likebutton from "@/components/Likebutton";

import styles from "@/styles/Home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { getEvent } from './api/event'

export const BLDGS = [
  "Alder Hall",
  "Elm Hall",
  "Hansee Hall",
  "Lander Hall",
  "Madrona Hall",
  "Maple Hall",
  "McCarty Hall",
  "McMahon Hall",
  "Oak Hall",
  "Poplar Hall",
  "Terry Hall",
  "Willow Hall",
  "Mercer Court",
  "Stevens Court",
  "Cedar Apartments",
  "Commodore Duchess",
  "Nordheim Court",
  "Radford Court",
  "Blakely Village",
  "Laural Village",
];

function getSearchOptions() {
  var options = [];
  BLDGS.forEach((name) => {
    options.push({ key: name, value: name });
  });
  return options;
}

export default function Home({ info }) {
  const router = useRouter();

  const events = info.slice(0, 4);
  const options = getSearchOptions();

  const handleSubmit = (value) => {
    if (value != undefined) {
      console.log(value);
      const bld = "" + value.item.key.toLowerCase();
      let code = bld.replace(" ", "-");
      console.log(code);
      router.push(`/wiki/dorms/${code}`);
    }
  };

  return (
    <>
      <Head>
        <title>Dorm-Wiki</title>
        <meta name="description" content="Your go-to place for UW dorm info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.main_content}>
          <div className={styles.big_logo}>
            <img
              style={{ height: "500px", width: "500px" }}
              src="/dw-logo-main.png"
            ></img>
          </div>
          <div className={styles.search_wrapper}>
            <ReactSearchBox
              placeholder="Search..."
              value=""
              data={options}
              onSelect={handleSubmit}
            />
          </div>
          <h2 className={styles.hrtitle}>Upcoming Events</h2>
          <div className={styles.upcoming_events}>
            {genCards(events)}
          </div>
        </div>
      </main>
    </>
  );
}

function genCards(events) {
  const router = useRouter();
  let arr = [];
  const handleClick = (value) => {
    ;
  };
  events.forEach((event, i) => {
    arr.push(
      <>
        <div key={i} className={styles.event_deck}>
          <img src="/events/events1.jpg"></img>
          <h2>{event["name"]}</h2>
          <h4>{event["location"]}</h4>
          <div className={styles.event_deck_button_container}>
            <Likebutton />
            <Link
              href={`/events/${event["_id"]}`}
              className={`${styles.event_button} ${styles.goto}`}
            ></Link>
          </div>
          <h3>{formatDate(event["startTime"], true)}</h3>
        </div>
      </>
    );
  });
  return arr;
}


export async function getStaticProps() {
  const info = await getEvent();
  return {
    props: {
      info,
    },
  };
}
