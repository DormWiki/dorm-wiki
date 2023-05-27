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
import Footer from "@/components/Footer";

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
      const bld = "" + value.item.key.toLowerCase();
      let code = bld.replace(" ", "-");
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
      <Navbar/>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.big_logo}>
            <img
              style={{ height: "500px", width: "500px" }}
              src="/dw-logo-main.png"
            ></img>
          </div>
          <div className={styles.search_wrapper}>
            <ReactSearchBox
              placeholder="Search for a dorm"
              value=""
              data={options}
              onSelect={handleSubmit}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.standout}>
              <h2><i>Finding the perfect dorm has never been simpler.</i></h2>
            </div>
            <p>
              Choosing a dorm can be overwhelming. We've gathered dorm information and condensed
              it down to just the essentials help you determine which dorm(s) will suit you best. 
              Get started by searching for a dorm.
            </p>
            <div className={styles.standout}>
              <h2>Submit reviews</h2>
            </div>
            <img
                style={{ height: "125px", width: "125px"}}
                src="/write.png"
            ></img>
            <p>
              Had a particularly good/bad experience at a dorm? Help others learn more about
              a dorm by writing a review.
            </p>
            <div className={styles.standout}>
              <h2>Find events</h2>
            </div>
            <img
                style={{ height: "70px", width: "150px"}}
                src="/banner.png"
            ></img>
            <p>
              There are always plenty of great events going on, but it can be hard to remember which event
              is happening when and where. We've centralized all the upcoming event information so it
              is easy to plan ahead.
            </p>
          </div>
          <div className={styles.testimonials}>
            <div className={styles.standout}>
              <h2>What students are saying</h2>
            </div>
            <p>
              <i>DormWiki is so useful! I loved the dorm I stayed at in my freshman year.</i>
            </p>
            <p>
              <i>I've been able to go to so many cool events recently because I am able to stay 
                updated through DormWiki!
              </i>
            </p>
          </div>
          <h2 className={styles.hrtitle}>Upcoming Events</h2>
          <div className={styles.upcoming_events}>
            {genCards(events)}
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}

function genCards(events) {
  let arr = [];
  const handleClick = (value) => {
    ;
  };
  events.forEach((event, i) => {
    arr.push(
      <>
        <Link className={styles.event_link} href={`/events/${event["_id"]}`}>
          <div key={i} className={styles.event_deck}>
            <img src="/events/events1.jpg"></img>
            <div className={styles.h2_wrapper}>
              <h2>{event["name"]}</h2>
            </div>
            <h4>{event["location"]}</h4>
            <div className={styles.event_deck_button_container}>
                <div
                  className={styles.no_link}
                  onClick={(e) => {
                    e.preventDefault();
                  }}>
                  <Likebutton id={event["_id"]} />
                </div>
              {event["likes"] === undefined ? 0 : event["likes"]}
            </div>
            <h3>{formatDate(event["startTime"], true)}</h3>
          </div>
        </Link>
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
