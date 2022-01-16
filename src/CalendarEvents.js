import React, { useEffect, useState } from "react";
import axios from "axios";
import {getTokensAndScope} from './storage';
import {Notification} from 'electron';

async function getCalendarEvents() {
  const { accessToken } = getTokensAndScope();
  const calendarId = "primary";
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
  const { data } = await axios.get(url, {
    params: {
      orderBy: "startTime",
      singleEvents: true,
      timeMin: new Date().toISOString(),
    },
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
  });

  return data.items;
}

function CalendarEvents() {
    const [events, setEvents] = useState(undefined);
  useEffect(() => {
    getCalendarEvents()
      .then((events) => setEvents(events));
  }, []);

  if (events === undefined) {
      return <div>Loading</div>;
  } else if (events.length === 0) {
      return <div>No events yet</div>;
  } else {
      return <ul>
          {
              events.map(event => {
                  return <li>{event.summary}: {event.description}</li>
              })
          }
      </ul>
  }
}

export default CalendarEvents;
