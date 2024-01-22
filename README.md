# IssueTracker

**An efficient issue tracking system that allows users to create, assign, and track issues or tickets.**

**Features:**

## Features

- **User Authentication:** Utilize social login with Google/Gmail for seamless access.
- **Dashboard Metrics:** Displays various tracking metrics to provide an overview.
- **User Profile:** Access and manage account settings easily.
- **Issue CRUD Operations:** Create, Read, Update, and Delete issues effortlessly.
- **Issue Prioritization:** Prioritize issues based on their importance.
- **Status Updates:** Keep track of the status of each issue.
- **Notifications/Alerts:** Receive updates and alerts within the dashboard.

**Technical Requirements:**

- Languages and Libraries:
    - JavaScript, React.Js, Express.Js, Node.Js, MongoDB
    - Redux-Toolkit for state management
    - Tailwind CSS for styling
    - Framer Motion for UI/UX

**Environment Setup**

- In the root folder, create an `.env` file and set your own keys for `MONGO` and `JWT_SECRET`.
- In the client folder, create a `.env` file and set your own keys for `VITE_FIREBASE_API_KEY`.

**Setup Instructions**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/1nilaypatel/IssueTracker.git

2. **Install NPM dependencies (in root folder) for server side:**
    ```bash
    npm install

3. **Start the server (in root folder) :**
    ```bash
    npm run dev

4. **Move to the Client Folder (in new terminal):**
    ```bash
    cd client

5. **Install NPM dependencies:**
    ```bash
    npm install

6. **Run the project:**
    ```bash
    npm run dev

7. **Access the application in your browser (port may vary):**
    ```bash
    http://localhost:5173/

### Note: Ensure you have Node.js and npm installed on your system.
