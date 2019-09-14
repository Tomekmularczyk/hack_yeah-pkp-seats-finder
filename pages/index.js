import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../components/App"), { ssr: false });

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>
    <App />
  </div>
);

export default Home;
