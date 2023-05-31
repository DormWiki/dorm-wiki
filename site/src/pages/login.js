import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from "next/link";
import { redirect } from 'next/navigation';
import Navbar from "../components/Navbar";
import GoogleButton from '../components/GoogleButton';
// remove signIn, signOut depends on where we implement signin and sign out
import { useSession, signIn, signOut } from 'next-auth/react';
import Footer from "@/components/Footer";
import Layout from '@/components/Layout';

import styles from "@/styles/Home.module.css";
import login from '@/styles/Login.module.css';
// import Layout from '@/components/Layout';


function getUsername(email) {
  let i = email.indexOf("@");
  return email.substring(0, i);
}

export default function Login() {
  const router = useRouter();
  const {data: session, status} = useSession();
  if (session === undefined ) {
    return "loading";
  }
  else if (status === "authenticated") { // logged in already 
    console.log("routing");
    router.push("/user");
  } else { // haven't logged in
    return (
      <>
        <Head>
          <title>Dorm Wiki</title>
          <meta
            name="description"
            content="Your go-to place for UW dorm info"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/dw-logo-icon.svg" />
        </Head>
        <Layout>
          <div className={login.signin_box}>
              <h2 className={login.hrtitle}>Welcome!</h2>
              <div className={login.button_wrapper}>
                <GoogleButton text="Sign in with Google"/>
              </div>
          </div>
        </Layout>
      </>
    );
  }
}
