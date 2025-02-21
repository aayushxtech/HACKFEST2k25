import React, { useState } from "react";

interface EventData {
  eventName: string;
  description: string;
  date: string;
  time: string;
}

const HostEvents: React.FC = () => {
  const [eventData, setEventData] = useState<EventData>({
    eventName: "",
    description: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle event submission logic here
    console.log("Event Data:", eventData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="host-events-container">
      <h1 className="text-3xl font-bold text-center mb-8">Host Events</h1>

      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="eventName"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              className="w-full p-2 border rounded-md"
              placeholder="Enter event name"
              value={eventData.eventName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Enter event description"
              value={eventData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full p-2 border rounded-md"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="time">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              className="w-full p-2 border rounded-md"
              value={eventData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Host Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostEvents;
