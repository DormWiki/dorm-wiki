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
import styles from "@/styles/Home.module.css";
import login from "@/styles/Login.module.css";
import Layout from "@/components/Layout";

function getUsername(email) {
  let i = email.indexOf("@");
  return email.substring(0, i);
}


export default function User() {
  const {data: session, status } = useSession();
 
  const router = useRouter();

  if (status === "loading" || session === undefined) {
    return;
  } else if (status === "unauthenticated" || session === null) {
    router.push("/login");
  }
  return (
    <>
      <Layout>
            <h2 className={login.hrtitle}>
              Welcome back, {getUsername(session.user.email)}!
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
          </div>
      </Layout>
    </>
  );
}
