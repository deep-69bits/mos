
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyDZr1Q7ZN0RXzF4yM8lTFLLsKRMP0_TZKw",

  authDomain: "masjids-1deec.firebaseapp.com",

  projectId: "masjids-1deec",

  storageBucket: "masjids-1deec.appspot.com",

  messagingSenderId: "725794385604",

  appId: "1:725794385604:web:45ca09a7891083512de391",

  measurementId: "G-Y38TNSNC7K"

};

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);