import Head from 'next/head'
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link'
import CustomCarousel from '@/components/Carousel';
import path from "path";
import Navbar from "../components/Navbar";
import { FileUploader } from "react-drag-drop-files";

import styles from '@/styles/Home.module.css'
import events from '@/styles/Events.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const fileTypes = ["JPG", "PNG", "GIF"];

function getUpcomingEvents(events_info) {
    var events_arr = [];
    events_info.forEach((event, i) => {
        events_arr.push(
          <span key={i} className={events.event_box}>
            <div className={events.event}>
              <div className={events.event_info}>
                <h2><u>
                  <Link href={`/events/${encodeURIComponent(event["_id"])}`}>
                    {event["name"]}
                  </Link></u>
                </h2>
                <h3 className={events.subtitle}>
                    <i>{formatDate(event["startTime"])}, {event["dorm_id"]} ({event["location"]})</i>
                </h3>
                <p className={events.p}>
                  description missing.
                </p>
                <i>- <b>{event["organizer"]}</b> @ {new Date(event["postDate"]).toLocaleDateString()}.</i>
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

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
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
      <main className={events.main}>
        <div className={events.content}>
          <h2 className={events.title}>Trending</h2>
          <div className={events.top}>
          <CustomCarousel paths={images}/>
          <h2 className={events.title}>Submit an Event</h2>
          <div className={events.form_wrapper}> 
            <form method="post" action="http://localhost:5050/postEvent">
            <div>
                <label className={events.field}>Event title:
                    <input type="text" name="name" required/>
                </label>
            </div>
            <div>
                <label className={events.field}>Organizer:
                    <input type="text" name="organizer" required/>
                </label>
            </div>
            <div>
                <label className={events.field}>Location:
                    <input type="text" name="location" required/>
                </label>
            </div>
            <input
                type="hidden"
                name="postDate"
                value={new Date().toISOString()}/>
            <div>
                <label className={events.field}>Dorm:
                    <input type="text" name="dorm_id" required/>
                </label>
            </div>
            <div>
                <label className={events.field}>Date & Time:
                    <input type="datetime-local" name="startTime" required/>
                </label>
            </div>
            <div>
                <label className={events.field}>Event description:
                    <div className={events.textarea}>
                        <textarea type="text" name="text" required/>
                    </div>
                </label>
            </div>
            <div>
                <label className={events.field}>Images:</label>
            </div>
            <div className={events.fileupload_wrapper}>
              <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            </div>
            <input className={events.submit_button} type="submit" id="submit" value="Submit"/>
            </form>
          </div>
          </div>
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


// helper function that formats time strings
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