import React, { useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Tabs from "./components/Tabs";

// const firebase_chat_app = {
//   apiKey: "AIzaSyD7kKUO1m_4JAa_beAq6KHoeLzXDCdxYl4",
//   authDomain: "fh-chat-demo.firebaseapp.com",
//   projectId: "fh-chat-demo",
//   storageBucket: "fh-chat-demo.appspot.com",
//   messagingSenderId: "605615695643",
//   appId: "1:605615695643:web:e82157dbed1b0dca1415be",
//   measurementId: "G-YTPGCZDH15",
// };
const firebase_joke_app = {
  apiKey: "AIzaSyCc5fk3eUUtcYz2EbSYUXnl2EU5-tuQAZ0",
  authDomain: "fh-witze-app.firebaseapp.com",
  projectId: "fh-witze-app",
  storageBucket: "fh-witze-app.appspot.com",
  messagingSenderId: "532750168903",
  appId: "1:532750168903:web:d0f622bface5c452bcd262",
  measurementId: "G-9GW06NQYJ8",
};

firebase.initializeApp(firebase_joke_app);

const auth = firebase.auth();
const firestore = firebase.firestore();
let adminUser = null;
//const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  // Fetch all jokes in Firestore
  const jokesRef = firestore.collection("Jokes");
  const query = jokesRef.orderBy("postedDate").limit(25);
  const [allJokes] = useCollectionData(query, { idField: "id" });
  console.log({ allJokes });

  const removeJokeById = async (jokeID) => {
    // Delete a joke from firestore:
    const jokesRef = firestore.collection("Jokes");
    console.log("Try to delete joke with ID: " + jokeID);
    await jokesRef
      .doc(jokeID)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>JokeStar Backend</h1>
        <SignOut />
      </header>

      <section>
        {user ? (
          <Tabs allJokes={allJokes} deleteJoke={removeJokeById} />
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

const emailSignIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      // var user = userCredential.user;
      adminUser = userCredential.user;
      console.log({ adminUser });
      // ...
    })
    .catch((error) => {
      console.log(error);
      // var errorCode = error.code;
      // var errorMessage = error.message;
    });
};

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    fields: {
      margin: "20px",
      width: "300px",
    },
  };
  // Admin data:
  // admin@jokeastarbackend.at
  // JokeStar_Admin2021
  return (
    <div style={styles.container}>
      <TextField
        id="standard-basic"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={styles.fields}
      />
      <TextField
        id="standard-basic"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={styles.fields}
      />
      <Button
        onClick={() => emailSignIn(email, password)}
        size="small"
        style={styles.fields}
      >
        Login
      </Button>
    </div>
  );

  // Email Sign in

  // const signInWithGoogle = () => {
  //   // Google Sign in
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //    auth.signInWithPopup(provider);
  // };

  // return (
  //   <>
  //     <button className="sign-in" onClick={signInWithGoogle}>
  //       Sign in with Google
  //     </button>
  //   </>
  // );
}

function SignOut() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
    },
    fields: {
      margin: "20px",
    },
  };

  console.log(auth.currentUser);

  return (
    auth.currentUser && (
      <div style={styles.container}>
        <button style={styles.fields} onClick={() => auth.signOut()}>
          Sign Out
        </button>
        <p style={styles.fields}>Logged in as: {auth.currentUser?.email}</p>
      </div>
    )
  );
}

// function getAllJokes() {
//   // const dummy = useRef();
//   const jokesRef = firestore.collection("Jokes");
//   const query = jokesRef.orderBy("postedDate").limit(25);
//   const [jokes] = useCollectionData(query, { idField: "id" });
//   console.log({ jokes });
//   return jokes;
// }

// async function removeJokeById(jokeID) {
//   const jokesRef = firestore.collection("Jokes");
//   console.log("Try to delete joke with ID: " + jokeID);
//   await jokesRef
//     .doc(jokeID)
//     .delete()
//     .then(() => {
//       console.log("Document successfully deleted!");
//     })
//     .catch((error) => {
//       console.error("Error removing document: ", error);
//     });
// }

export default App;
