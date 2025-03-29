import "./eventBlockComp.css"

export function EventBlockComp({ events }) {
  if (events.length == 0) return <p>No events found</p>
  return (
    <div className="event-container">
      {events.map((event) => (
        <div key={event.UEID} className="event-block">
          <h3>{event.eventName}</h3>
          {event.hostName && (
            <p><b>Event Host: </b>{event.hostName}</p>
          )}
          <p>{event.eventDesc}</p>
          <p><b>Date:</b> {event.date}</p>
          <p><b>Location:</b> {event.locationName}</p>
          <p><b>Capacity:</b> {event.cap}</p>
          <p><b>Tags:</b> {event.tags}</p>
        </div>
      ))}
    </div>
  )
}

export default EventBlockComp;