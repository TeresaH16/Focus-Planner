import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import "./App.css";

type Task = {
  id: string;
  title: string;
  minutes: number;
  done: boolean;
};

const STORAGE_KEY = "small-hours.tasks.v1";

function loadTasks(): Task[] {
  try {
    const stored: unknown = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]",
    );

    if (!Array.isArray(stored)) return [];

    return stored.filter(
        (item): item is Task =>
            item !== null &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            typeof item.title === "string" &&
            typeof item.minutes === "number" &&
            typeof item.done === "boolean",
    );
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState(25);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!activeTaskId) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setTasks((currentTasks) =>
              currentTasks.map((task) =>
                  task.id === activeTaskId ? { ...task, done: true } : task,
              ),
          );
          setActiveTaskId(null);
          setMessage("Lovely work. Your focus session is complete.");
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [activeTaskId]);

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    setTasks((current) => [
      {
        id: crypto.randomUUID(),
        title: cleanTitle,
        minutes,
        done: false,
      },
      ...current,
    ]);
    setTitle("");
    setMessage("Added to your focus list.");
  }

  function toggleTask(id: string) {
    setTasks((current) =>
        current.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task,
        ),
    );
  }

  function deleteTask(id: string) {
    if (activeTaskId === id) {
      setActiveTaskId(null);
      setSecondsLeft(0);
    }
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function startTimer(task: Task) {
    setActiveTaskId(task.id);
    setSecondsLeft(task.minutes * 60);
    setMessage("Your focus session starts now.");
  }

  const remaining = tasks.filter((task) => !task.done).length;

  return (
      <main className="shell">
        <header className="topbar">
          <a className="brand" href="#">✳ small hours</a>
          <span className="date">
          {new Intl.DateTimeFormat(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          }).format(new Date())}
        </span>
        </header>

        <section className="intro">
          <p className="eyebrow">A little room to think</p>
          <h1>
            Make space for
            <br />
            <em>what matters.</em>
          </h1>
          <p className="subhead">
            Pick one meaningful thing. Give it a little time. Let the rest wait.
          </p>
        </section>

        <section className="planner">
          <div className="task-panel">
            <h2>01　What’s on your mind?</h2>
            <form onSubmit={addTask}>
              <label className="sr-only" htmlFor="task-title">
                Describe your task
              </label>
              <input
                  id="task-title"
                  value={title}
                  maxLength={90}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Sketch ideas for my portfolio"
                  required
              />
              <div className="form-row">
                <label htmlFor="duration">I have</label>
                <select
                    id="duration"
                    value={minutes}
                    onChange={(event) => setMinutes(Number(event.target.value))}
                >
                  <option value={15}>15 minutes</option>
                  <option value={25}>25 minutes</option>
                  <option value={45}>45 minutes</option>
                </select>
                <button className="primary" type="submit">
                  Add focus ↗
                </button>
              </div>
            </form>
            <p className="hint">✦ Keep it small enough to begin right now.</p>
          </div>

          <aside className="quote-card">
            <span className="sun">☼</span>
            <p className="quote">
              “You don’t have to see the whole staircase. Just take the first
              step.”
            </p>
            <small>— Martin Luther King Jr.</small>
            <hr />
            <small>A softer kind of productivity. Progress over pressure.</small>
          </aside>
        </section>

        <section className="focus-section">
          <div className="list-heading">
            <h2>02　Your focus list</h2>
            <span>{remaining} {remaining === 1 ? "session" : "sessions"}</span>
          </div>

          {tasks.length === 0 ? (
              <div className="empty-state">
                <span>◌</span>
                <p>Your next small win belongs here.</p>
                <small>Start with whatever feels easiest.</small>
              </div>
          ) : (
              <ul className="task-list">
                {tasks.map((task) => (
                    <li className={`task-item${task.done ? " done" : ""}`} key={task.id}>
                      <input
                          type="checkbox"
                          checked={task.done}
                          aria-label={`Mark ${task.title} complete`}
                          onChange={() => toggleTask(task.id)}
                      />
                      <span className="task-title">{task.title}</span>
                      {activeTaskId === task.id ? (
                          <span className="timer" aria-live="polite">
                    {Math.floor(secondsLeft / 60)}:
                            {String(secondsLeft % 60).padStart(2, "0")}
                  </span>
                      ) : (
                          <span className="task-meta">
                    {task.minutes} min{" "}
                            <button type="button" onClick={() => startTimer(task)}>
                      Start
                    </button>
                  </span>
                      )}
                      <button
                          className="delete-button"
                          type="button"
                          aria-label={`Delete ${task.title}`}
                          onClick={() => deleteTask(task.id)}
                      >
                        ×
                      </button>
                    </li>
                ))}
              </ul>
          )}
        </section>

        {tasks.some((task) => task.done) && (
            <button
                className="text-button"
                type="button"
                onClick={() =>
                    setTasks((current) => current.filter((task) => !task.done))
                }
            >
              Clear completed
            </button>
        )}

        <footer>Made for the in-between moments.</footer>
        <div className="sr-only" role="status" aria-live="polite">
          {message}
        </div>
      </main>
  );
}

export default App;