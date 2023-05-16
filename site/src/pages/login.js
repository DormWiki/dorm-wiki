import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from "next/link";
import { redirect } from 'next/navigation';
import Navbar from "../components/Navbar";
import GoogleButton from '../components/GoogleButton';

import styles from "@/styles/Home.module.css";
import login from '@/styles/Login.module.css';


export default function Login() {

  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={login.signin_box}>
            <h2 className={login.hrtitle}>Welcome!</h2>
            <div className={login.button_wrapper}>
              <GoogleButton text="Sign in with Google"/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
