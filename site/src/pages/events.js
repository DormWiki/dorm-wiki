import Head from 'next/head'
import React, { useState } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import events from '@/styles/Events.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Events() {
  return (
    <>
      <Head>
        <title>Dorm-Wiki</title>
        <meta name="description" content="Your go-to place for UW dorm info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-dorm-wiki.png" />
      </Head>
        <div className={styles.navbar}>
        <ul>
            <li>
                <Link a href="/">Home</Link>
            </li>
            <li>
                <Link href="/events">Events</Link>
            </li>
            <li>
                <Link href="/wiki">Wiki</Link>
            </li>
            <li>
                <Link href="/about">About</Link>
            </li>
            <li>
                <Link href="/search">Search</Link>
            </li>
        </ul>
            <button type="button">Login</button>
        </div>
        <main className={events.main}>
            <h2 className={events.title}>Trending</h2>
            <h2 className={events.title}>Upcoming</h2>
            <div className={events.content}>
                Events info
                Contact info
                Photos
                RSVP
                Guest list
            </div>
        </main>
    </>
  );
}
