import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import React, { useState } from "react";
export default function Login() {
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
                    <Link href="/wiki">Wiki</Link>
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
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link href="#">Link</Link>
          </li>
          <li>
            <Link href="#">Link</Link>
          </li>
        </ul>
      </div>
      <section className={styles.content}>Login</section>
    </>
  );
}
