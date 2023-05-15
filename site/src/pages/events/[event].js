import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

import styles from '@/styles/Home.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function Event( {event_info} ) {
  const router = useRouter();
  const event_id = router.query;

  return (
    <>
      <Head>
        <title>{event_info}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dw-logo-icon.png" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/event_info.json")
      .then(res =>
          res.json()
      );
  const event_info = res;

  return {
    props: {
      event_info
    },
  };
}

