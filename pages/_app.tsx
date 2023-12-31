"use client"
import React from 'react';
import App, { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
// own css files here
import '@/app/page.module.css';

function MyApp({ Component, pageProps }: AppProps) {
  // You can add global styles or context providers here
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return
  <>
    <Component {...pageProps} />;
    <ToastContainer />
  </> 

}

export default MyApp;