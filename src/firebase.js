
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyCxXHF_PDMZrsHGSLbe6szFwQ0Gle_ZJoU",

  authDomain: "dashmasjid.firebaseapp.com",

  projectId: "dashmasjid",

  storageBucket: "dashmasjid.appspot.com",

  messagingSenderId: "277259182510",

  appId: "1:277259182510:web:297622715e1cae88a3283f",

  measurementId: "G-YKZ71JTXPP"


};

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);