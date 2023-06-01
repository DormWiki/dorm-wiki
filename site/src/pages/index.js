import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import ReactSearchBox from "react-search-box";
import { formatDate } from "@/misc";
import Likebutton from "@/components/Likebutton";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { getEvent } from './api/event'
import { getLikes } from "./api/user";
import { getSession } from "next-auth/react";

/**
 * Names of the dorm buildings.
 */
export const buildings = [
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

/**
 * Makes the dorms as options to be selected in the search bar.
 * @returns dorms as options for the search bar
 */
function getSearchOptions() {
  var options = [];
  buildings.forEach((name) => {
    options.push({ key: name, value: name });
  });
  return options;
}

export default function Home({ info, data }) {
  const router = useRouter();

  const events = info.slice(0, 4).reverse();
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
        <title>Dorm Wiki</title>
        <meta name="description" content="Your go-to place for UW dorm info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.svg"/>
      </Head>
      <Layout>
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
            <h2>
              <i>Finding the perfect dorm has never been simpler.</i>
            </h2>
          </div>
          <p>
            Choosing a dorm can be overwhelming. We&apos;ve gathered dorm
            information and condensed it down to just the essentials help you
            determine which dorm(s) will suit you best. Get started by searching
            for a dorm.
          </p>
          <div className={styles.standout}>
            <h2>Submit reviews</h2>
          </div>
          <img
            style={{ height: "125px", width: "125px" }}
            src="/write.png"
          ></img>
          <p>
            Had a particularly good/bad experience at a dorm? Help others learn
            more about a dorm by writing a review.
          </p>
          <div className={styles.standout}>
            <h2>Find events</h2>
          </div>
          <img
            style={{ height: "70px", width: "150px" }}
            src="/banner.png"
          ></img>
          <p>
            There are always plenty of great events going on, but it can be hard
            to remember which event is happening when and where. We&apos;ve
            centralized all the upcoming event information so it is easy to plan
            ahead.
          </p>
        </div>
        <div className={styles.standout}>
            <h2>What students are saying</h2>
        </div>
        <div className={styles.testimonials}>
          <div className={styles.quote_box}>
            <p>
              <i>
                &quot;DormWiki is my go-to for dorm info! So convenient and reliable. My friends
                and I use it all the time. &quot; 
              </i>
            </p>
            <br/> - Alex B.
          </div>
          <div className={styles.quote_box}>
            <p>
              <i>
                &quot;My college experience has been great so far. I&apos;ve been able to go
                to so many cool events recently because DormWiki helps me stay updated!&quot; 
              </i>
            </p>
            <br/>  - Sarah H.
          </div>
          <div className={styles.quote_box}>
            <p>
              <i>
                &quot;Thanks to DormWiki, I feel much more connected to my dorm community.
                Highly recommend!&quot; 
              </i>
            </p>
            <br/> 
            - Emma R.
          </div>
        </div>
        <h2 className={styles.hrtitle}>Upcoming Events</h2>
        <div className={styles.upcoming_events}>{genCards(events, data["likes"])}</div>
      </Layout>
    </>
  );
}

/**
 * Gets and formats the top four upcoming events.
 * @param {*} events the events to be highlighted
 * @param {*} likes the likes the events have
 * @returns 
 */
function genCards(events, likes) {
  let arr = [];
  events.forEach((event, i) => {
    const MAX_LENGTH = 22;
    let size = 2 - (event["name"].length / MAX_LENGTH)*0.7;
    arr.push(
      <>
        <Link className={styles.event_link} href={`/events/${event["_id"]}`}>
          <div key={i} className={styles.event_deck}>
            <img src="/events/events1.jpg"></img>
            <div className={styles.h2_wrapper}>
              <h2 style={{ fontSize: size + "vw" }}>{event["name"]}</h2>
            </div>
            <h4>{event["location"]}</h4>
            <div className={styles.event_deck_button_container}>
              <div
                className={styles.no_link}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Likebutton
                  selected={likes.indexOf(event["_id"]) !== -1}
                  onClick={change_event}
                  id={event["_id"]}
                />
              </div>
              <div>{event["likes"] === undefined ? 0 : event["likes"]}</div>
            </div>
            <h3>{formatDate(event["startTime"], true)}</h3>
          </div>
        </Link>
      </>
    );
  });
  return arr;
}

/**
 * Changes an event's number of likes. 
 * @param {*} event the event to change
 */
function change_event(event) {
  let clicked = event.target.classList.length === 2;
  let likes = event.target.parentElement.nextElementSibling.innerText;
  event.target.parentElement.nextElementSibling.innerText = clicked
    ? parseInt(likes) + 1
    : parseInt(likes) - 1;
}

/**
 * Retrieves information from the server.
 * @param {*} context the request and response
 * @returns props/data from the server
 */
export async function getServerSideProps(context) {
  const info = await getEvent(undefined, true);
  const likes = await getLikes(context.req, context.res);
  let data;
  if (likes === undefined) {
    data = JSON.parse('{"likes": []}');
  } else {
    data = likes[0];
  }
  return {
    props: {
      info,
      data,
    },
  };
}
