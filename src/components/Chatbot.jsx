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
  const [hiddenSend, setHiddenSend] = useState(false);

  async function sendMessage(event) {
    event.preventDefault();
    setHistory((prev) => [
      ...prev,
      { role: "user", parts: [{ text: message }] },
    ]);
    setMessage("");
    setHiddenSend(true);
    try {
      const { text } = await superagent
        .post(import.meta.env.VITE_BACKEND_URL + "/gemini")
        .send({ message, history });

      setHistory((prev) => [
        ...prev,
        { role: "model", parts: [{ text: text }] },
      ]);
      setHiddenSend(false);
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
        parts: [{ text: `Hello, I am interviewing for the job title of ${title}.` }],
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
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Home
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Help
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Account
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <aside className={styles.sideMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          width="28"
          stroke="#fff"
          className={styles.sideIcon}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          width="28"
          stroke="#fff"
          className={styles.sideIcon}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          width="28"
          stroke="#fff"
          className={styles.sideIcon}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          width="28"
          stroke="#fff"
          className={styles.sideIcon}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          width="28"
          stroke="#fff"
          className={styles.sideIcon}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </aside>

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
              // className={`${styles.sendBtn} ${hiddenSend ? styles.hidden : ""}`}
              className={styles.sendBtn}
              disabled={hiddenSend}
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Is it copyrighted if you haven't filed for copyright?
        </p>
      </footer>
    </div>
  );
}
