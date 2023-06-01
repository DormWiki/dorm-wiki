import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";
import GoogleButton from "../components/GoogleButton";
// remove signIn, signOut depends on where we implement signin and sign out
import { useSession, signIn, signOut } from "next-auth/react";
import { getUpcomingEvents } from "./events";
import styles from "@/styles/Home.module.css";
import events from "@/styles/Events.module.css";
import login from "@/styles/Login.module.css";
import Layout from "@/components/Layout";
import { getEvent } from "./api/event";
import { getLikes } from "./api/user";
import { formatDate, cleanName } from "@/misc";

/**
 * Gets the events the user has previously liked.
 * @param {*} events_info the event (includes title, start time, etc.)
 * @param {*} likes the number of likes the event has
 * @returns 
 */
function getEvents(events_info, likes) {
  let events_arr = [];
  console.log(likes);
  console.log(events_info);
  events_info.forEach((event, i) => {
    if (likes.includes(event["_id"])) {
      events_arr.push(
        <span key={i} className={events.event_box}>
          <div className={events.event}>
            <div className={events.event_info}>
              <h2>
                <u>
                  <Link href={`/events/${encodeURIComponent(event["_id"])}`}>
                    {event["name"]}
                  </Link>
                </u>
              </h2>
              <h3 className={events.subtitle}>
                <i>
                  {formatDate(event["startTime"])},{" "}
                  {cleanName(event["dorm_id"])} ({event["location"]})
                </i>
              </h3>
              <p className={events.p}>{event["description"]}</p>
              <i>
                - <b>{event["organizer"]}</b> @{" "}
                {new Date(event["postDate"]).toLocaleDateString()}.
              </i>
            </div>
          </div>
        </span>
      );
    }
  });
  return events_arr;
}


export default function User({ events_info, data }) {
  const {data: session, status } = useSession();
  
  const router = useRouter();

  if (status === "loading" || session === undefined) {
    return;
  } else if (status === "unauthenticated" || session === null) {
    router.push("/login");
  } else {
    let arr = getEvents(events_info, data["likes"]);
    return (
      <>
        <Head>
          <title>Dorm Wiki</title>
          <meta name="description" content="Your go-to place for UW dorm info" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/dw-logo-icon.svg"/>
        </Head>
        <Layout>
              <h2 className={login.hrtitle}>
                Welcome back, {session.user.name}!
              </h2>
              <div className={login.button_wrapper}>
                <button
                  className={login.signout_button}
                  onClick={() => {
                    signOut();
                    setTimeout(() => {
                      router.push("/login");
                    }, 500);
                  }}
                >
                  Sign out
                </button>
              </div>
            <div className={login.events}>
              <h2 className={login.hrtitle}>
                Saved Events
              </h2>
              {arr}
            </div>
        </Layout>
      </>
    );
  }
}

/**
 * Retrieves information from the server.
 * @param {*} context the request and response
 * @returns props/data from the server
 */
export async function getServerSideProps(context) {
  const events_info = await getEvent();
  const likes = await getLikes(context.req, context.res);
  let data = JSON.parse('{"likes": []}');
  if (likes !== undefined) {
    data = likes[0];
  }
  return {
    props: {
      events_info,
      data
    },
  };
}
