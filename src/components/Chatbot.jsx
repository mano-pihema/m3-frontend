import { useState } from "react";
import superagent from "superagent";
import styles from "./Chatbot.module.css";

const chats = [
  {
    name: "AInterviewer",
    message: "Hello, I am interviewing for the job of...",
  },
  {
    name: "Pouyan Iranpour",
    message: "The backend is looking really clean. Nice work...",
  },
  {
    name: "Mano Pihema",
    message: "You finished the frontend already? Wow!...",
  },
  {
    name: "Group 3",
    message: "May be the best project group in the www...",
  },
];

export default function Chatbot() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(true);

  async function sendMessage(event) {
    event.preventDefault();
    setHistory((prev) => [
      ...prev,
      { role: "user", parts: [{ text: message }] },
    ]);
    setMessage("");
    try {
      const { text } = await superagent
        .post("http://localhost:3000/gemini")
        .send({ message, history });

      setHistory((prev) => [
        ...prev,
        { role: "model", parts: [{ text: text }] },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  function establishTitle(event) {
    event.preventDefault();
    setShow(false);
    setHistory([
      {
        role: "user",
        parts: [{ text: `Hello, I am interviewing for the job of ${title}.` }],
      },
      {
        role: "model",
        parts: [{ text: "Tell me more about yourself" }],
      },
    ]);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.heading}>
          Turners<span className={styles.people}>People</span>
        </h1>
      </header>

      <aside className={styles.sideMenu}>Menu</aside>

      <div className={styles.chatTitleArea}>
        <p className={styles.chatsTitle}>Chats</p>
      </div>
      <div className={styles.chatList}>
        {chats.map((chat, i) => (
          <div key={i} className={styles.chat}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#363636"
              className={styles.userIcon}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <div className={styles.chatInfo}>
              <p className={styles.chatName}>{chat.name}</p>
              <p className={styles.chatMessage}>{chat.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chatHeading}>
        <h2 className={styles.chatHeadingText}>AInterviewer </h2>
      </div>
      <div className={styles.chatContainer}>
        <form className={styles.jobTitle}>
          <h3 className={styles.formHeading}>
            Job Title:{" "}
            <span className={styles.enteredJobTitle}>{`${
              !show ? title : ""
            }`}</span>
          </h3>
          <input
            className={`${styles.jobInput} ${show ? "" : styles.hidden}`}
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What position are you interviewing for?"
          />
          <button
            className={`${styles.submitButton} ${show ? "" : styles.hidden}`}
            onClick={establishTitle}
          >
            Start interview
          </button>
        </form>

        <div className={styles.chatHistoryAndInput}>
          <div className={styles.chatArea}>
            {history.map(({ role, parts }, i) => {
              return (
                <div className={styles.chatBox} key={i}>
                  {role == "user" ? (
                    <p className={styles.myChat}>
                      {"Me"}: {parts[0].text}
                    </p>
                  ) : (
                    <p className={styles.modelChat}>{parts[0].text}</p>
                  )}
                </div>
              );
            })}
          </div>

          <form
            className={`${styles.messageForm} ${!show ? "" : styles.hidden}`}
          >
            <input
              type="text"
              className={styles.messageInput}
              onChange={(event) => setMessage(event.target.value)}
              value={message}
            />
            <button
              type="submit"
              onClick={sendMessage}
              className={styles.sendBtn}
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>Footer</p>
      </footer>
    </div>
  );
}
