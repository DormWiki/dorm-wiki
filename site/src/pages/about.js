import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";
import events from '@/styles/Events.module.css'

export default function About() {

  const router = useRouter();

  return (
    <>
      <div className={styles.logo}>
        <div className={styles.navbar_logo_wrapper}>
            <img src="/dw-logo-navbar.png"></img>
        </div>
        <div className={styles.navbar}>
            <ul>
                <li>
                    <Link a href="/">Home</Link>
                </li>
                <li>
                    <Link href="/events">Events</Link>
                </li>
                <li>
                    <div className={styles.dropdown}>
                        <Link href="/wiki">Wiki</Link>
                        <div className={styles.dropdown_text}>
                            <Link href="/wiki/residence-halls">Residence halls</Link>
                            <Link href="/wiki/academic-apts">
                                Academic-year apartments
                            </Link>
                            <Link href="/wiki/year-apts">Full-year apartments</Link>
                            <Link href="/wiki/family-apts">Family apartments</Link>
                        </div>
                    </div>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                <li>
                    <Link href="/search">Search</Link>
                </li>
                <button type="button" onClick={() => router.push('/login')}>Login</button>
            </ul>
        </div>
      </div>
      <main className={events.main}>
        <div className={styles.content}>
          <h2 className={styles.title}>About</h2>
          <p className={styles.p}>
            DormWiki aims to provide prospective and incoming University of Washington students
            a simple and straightforward way to learn about the various dorms on campus, in hopes
            of helping them find the one that most suits their needs. It also keeps current students
            updated on the events happening at their dorms, in an effort to help students become
            acclimated to the dorm environment and to foster an overall sense of community.
          </p>
          <h2 className={styles.title}>The Team</h2>
          <div className={styles.list_wrapper}>
            <li>
              Jaylyn Zhang
            </li>
            <li>
              Lydia Li
            </li>
            <li>
              Yijia Zhao
            </li>
            <li>
              Niko Permilovsky
            </li>
            <li>
              Mia Yamada-Heidner
            </li>
          </div>
        </div>
      </main>
    </>
  );
}
