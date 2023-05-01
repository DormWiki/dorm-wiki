import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";
import login from '@/styles/Login.module.css';

export default function Login() {

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
      <main className={styles.main}>
        <div className={styles.content}>
          <h2 className={login.hrtitle}>
             Welcome!
          </h2>
          <div className={login.button_wrapper}>
            <button type="button" className={login.button}>
              Sign in with Google
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
