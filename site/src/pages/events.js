import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CustomCarousel from "@/components/Carousel";
import path from "path";
import Navbar from "../components/Navbar";
import { FileUploader } from "react-drag-drop-files";
import { formatDate } from "@/misc";
import { getEvent } from "./api/event";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import { cleanName } from "@/misc";

import styles from "@/styles/Home.module.css";
import events from "@/styles/Events.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const fileTypes = ["JPG", "PNG", "GIF"];

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

function getUpcomingEvents(events_info) {
  var events_arr = [];
  events_info.forEach((event, i) => {
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
                {formatDate(event["startTime"])}, {cleanName(event["dorm_id"])} (
                {event["location"]})
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
  });

  return events_arr;
}

function getDorms() {
  let dorms = [];
  BLDGS.forEach((name) => {
    dorms.push(
      <option value={name}>{name}</option>
    );
  });
  return dorms;
}

export default function Events({ events_info, images }) {
  const router = useRouter();
  var events_arr = getUpcomingEvents(events_info);

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const dormOptions = getDorms();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      organizer: event.target.organizer.value,
      location: event.target.location.value,
      postDate: event.target.postDate.value,
      dorm_id: event.target.dorm_id.value.split(" ").join("-").toLowerCase(),
      startTime: event.target.startTime.value,
      description: event.target.text.value,
    };
  
    console.log(data);

    const response = await fetch("/api/event", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    });
  
    const result = await response.status;
    if (result == 200) {
      router.reload(window.location.pathname);
    } else {
      router.push("/500");
    }
  };

  return (
    <>
      <Head>
        <title>Dorm Wiki</title>
        <meta name="description" content="Your go-to place for UW dorm info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.svg" />
      </Head>
      <Layout>
        <h2 className={events.title}>Trending</h2>
        <div className={events.top_wrapper}>
          <div className={events.carousel_wrapper}>
            <CustomCarousel paths={images} />
          </div>
          <div className={events.submit_event_wrapper}>
            <h2 className={events.title_right}>Submit an Event</h2>
            <div className={events.form_fields_wrapper}>
              <form onSubmit={handleSubmit} method="post">
                <div>
                  <label className={events.field}>
                    Event title:
                    <input type="text" maxLength="25" name="name" required />
                  </label>
                </div>
                <div>
                  <label className={events.field}>
                    Organizer:
                    <input type="text" name="organizer" required />
                  </label>
                </div>
                <div>
                  <label className={events.field}>
                    Location:
                    <input type="text" name="location" required />
                  </label>
                </div>
                <input
                  type="hidden"
                  name="postDate"
                  value={new Date().toISOString()}
                />
                <div>
                  <label className={events.field}>
                    Dorm:
                    <div>
                      <select name="dorm_id" required>
                        {dormOptions}
                      </select>
                    </div>
                  </label>
                </div>
                <div>
                  <label className={events.field}>
                    Date & Time:
                    <input type="datetime-local" name="startTime" required />
                  </label>
                </div>
                <div>
                  <label className={events.field}>
                    Event description:
                    <div className={events.textarea}>
                      <textarea type="text" name="text" required />
                    </div>
                  </label>
                </div>
                <div>
                  <label className={events.field}>Images:</label>
                </div>
                <div className={events.fileupload_wrapper}>
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                  />
                </div>
                <input
                  className={events.submit_button}
                  type="submit"
                  id="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
        <h2 className={events.title}>Upcoming</h2>
        {events_arr}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const events_info = await getEvent();
  const fs = require("fs");

  const dir = path.resolve("./public", "events");

  const filenames = fs.readdirSync(dir);

  const images = filenames.map((name) => path.join("/", "events", name));
  return {
    props: {
      events_info,
      images,
    },
  };
}
