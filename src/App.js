import React, { useRef, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import JokeList from "./components/JokeList";
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
//const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬 Joke App</h1>
        <SignOut />
      </header>

      <section>{user ? <Tabs /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function Dashboard() {
  const dummy = useRef();
  const jokesRef = firestore.collection("Jokes");
  const query = jokesRef.orderBy("postedDate").limit(25);
  const [jokes] = useCollectionData(query, { idField: "id" });
  console.log({ jokes });

  const deleteJoke = async (jokeID) => {
    //joke.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    console.log(auth);

    // Delete a joke from firestore:
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

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        <JokeList jokes={jokes} onDelete={deleteJoke} />
        <span ref={dummy}></span>
      </main>
    </>
  );
}

// function ChatMessage(props) {
//   const { text, uid, photoURL } = props.message;

//   const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

//   return (
//     <>
//       <div className={`message ${messageClass}`}>
//         <img
//           src={
//             photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
//           }
//         />
//         <p>{text}</p>
//       </div>
//     </>
//   );
// }

export default App;
