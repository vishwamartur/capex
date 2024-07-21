import { useState, useEffect } from "react";
import { formatDuration, intervalToDuration } from "date-fns";

const Countdown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(
    intervalToDuration({ start: new Date(), end: endDate })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const duration = intervalToDuration({ start: now, end: endDate });
      setTimeLeft(duration);
      if (now >= endDate) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formattedDuration = formatDuration(timeLeft, { delimiter: ", " });

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
      <h2 className="mb-2 text-lg font-semibold">Time Remaining</h2>
      <p className="text-xl font-bold">{formattedDuration}</p>
    </div>
  );
};

export default Countdown;
