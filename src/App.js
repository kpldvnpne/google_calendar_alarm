import React, {useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import constructOAuthLink from "./constructOAuthLink";
import GoogleOAuthAuthorizationCodeReceiver from "./GoogleOAuthAuthorizationCodeReceiver";
import CalendarEvents from "./CalendarEvents";
import { Children } from "react/cjs/react.production.min";

const calendarEventScope =
  "https://www.googleapis.com/auth/calendar.events.readonly";
export const REDIRECT_URL = "http://localhost:3000/google_oauth";
export const CLIENT_ID =
  "672456641143-7l6noj77eir8bv1q56s9crmnesvihmho.apps.googleusercontent.com";
export const CLIENT_SECRET = "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";

export const AUTHORIZED_ROUTE = "/authorized";

const electron = window.require('electron');
const remote = electron.remote
const {BrowserWindow,dialog,Menu} = remote
function showNotification() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.once('ready-to-show', () => { win.show()})
}

function App() {
  const link = constructOAuthLink({
    scope: calendarEventScope,
    redirectUri: REDIRECT_URL,
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    showNotification();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/google_oauth" element={<GoogleOAuthAuthorizationCodeReceiver />} />
        <Route path={AUTHORIZED_ROUTE} element={<CalendarEvents />} />
        <Route
          index
          element={
            <a href={link}>
              Click on this link to authorize our app to access your google
              account
            </a>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
