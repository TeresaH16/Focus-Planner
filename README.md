# Small Hours

## Description
Small Hours is a gentle, browser-based focus planner. Add a task, choose a 15, 25, or 45 minute focus session, and work through your list at your own pace. Tasks are saved in browser local storage on the device where you created them.

## Purpose
I built Small Hours for students and busy people who feel stuck when a to-do list gets too large. It turns an intention into a small, timed next step without accounts or setup.

## Features
- Add and remove focus tasks with a time estimate.
- Run a per-task countdown and mark completed sessions.
- Keep tasks in browser storage across reloads.
- Responsive layout for desktop and mobile.
- Form labels and live status announcements.

## Technologies
HTML, CSS, vanilla JavaScript, browser localStorage and Web Crypto API. Google Fonts supply DM Sans and Playfair Display, with generic sans-serif and serif fallbacks.

## AI Tools Used
OpenAI Codex was used as the AI coding assistant during development.

## Installation
No package installation is needed. Clone or download this repository. With Python installed, start a local static server from the project directory:

```bash
python3 -m http.server 8000
```

## Running the Application
Open `http://localhost:8000` after starting the server. You can also open `index.html` directly in a modern browser. No API key or account is required.

## How AI Was Used
Codex helped turn the initial idea into an interface, implement the task and timer interactions, and refine persistence and edge cases. Task titles are inserted as text, malformed stored entries are filtered, and deleting a timed task clears its timer. Browser smoke testing confirmed that a task can be added to the list. Full timer and reload testing remains to be done.

Prompts that shaped the application:
1. “Build a calm, useful focus planner for people who feel overwhelmed by big to-do lists. Keep it simple and runnable as a static browser app.”
2. “Add a task form with 15, 25, and 45 minute options, a per-task countdown, completion controls, and persistence across refreshes.”
3. “Review the interactions for edge cases: malformed saved data, safe rendering of user text, accessible labels, deleting a timed task, and mobile layout.”

## Screenshots
Screenshots still need to be captured from the running app and added to the repository. Add an empty planner view and a view with one or more focus tasks before submission.

## Future Improvements
- Add pause and resume controls for an active timer.
- Let users reorder tasks and group them by project.
- Add an optional sound or notification when a session ends.

## Vibe Coding Reflection

### 1. What did AI do particularly well?
AI quickly produced a coherent first version of the visual layout and core add/list flow. That gave me something concrete to run and improve instead of starting from a blank page.

### 2. What did AI do poorly?
An early implementation might render task text as HTML, which would treat user input as markup. The final version uses `textContent` for titles. Timer behavior also needed explicit handling for deleting a task while its interval was running.

### 3. How did you verify AI-generated code?
I opened the app in a browser and confirmed that submitting a task adds it to the focus list. I also checked the JavaScript syntax. Timer completion, persistence after reload, and responsive layout still need additional hands-on testing.

### 4. How did your prompts evolve?
The early prompt asked for a “simple focus app.” I improved it by naming the intended user and friction point, then specifying duration choices, countdown, persistence, empty state, accessible controls, and edge cases. Those details made the output easier to evaluate.

### 5. What did you learn?
I learned that a useful prompt describes observable behavior, not just a general vibe. Small browser features such as local storage and timers also have lifecycle edge cases that need human review.

### 6. Would you trust AI to build the entire application without human supervision?
No. AI can accelerate scaffolding and suggest improvements, but it can overlook edge cases, accessibility, and unsafe assumptions. A person still needs to run the app, inspect its behavior, and take responsibility for what is published.

## Development Iterations
- **Version 1:** One-page task entry and focus list.
- **Version 2:** Duration selection, countdown sessions, completion and deletion.
- **Version 3:** Persistence, empty state, responsive styling, and accessible feedback.
- **Version 4:** Reviewed timer cleanup, malformed saved data, and safe rendering of task text.

This first published commit contains the current implementation. The version list above describes the feature sequence; additional commits should record future changes.
