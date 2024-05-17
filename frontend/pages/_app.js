import React from "react";
import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

// Create a Redux store
const store = createStore(rootReducer);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Reservation System</title>
          <meta
            name="description"
            content="A system to reserve items with specific locations."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Provider store={store}>
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default MyApp;
