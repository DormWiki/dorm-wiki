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

import styles from "@/styles/Home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const URL = "http://localhost:5050";

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
            <div className={styles.event_deck}>{events[0]["_id"]}</div>
            <div className={styles.event_deck}>{events[1]["_id"]}</div>
            <div className={styles.event_deck}>{events[2]["_id"]}</div>
            <div className={styles.event_deck}>{events[3]["_id"]}</div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(URL + "/getUpcomingEvents");

  if (!res.ok) {
    throw new Error("fetch fail");
  }
  const info = await res.json();
  return {
    props: {
      info,
    },
  };
}
