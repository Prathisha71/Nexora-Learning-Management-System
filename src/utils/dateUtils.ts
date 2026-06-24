/**
 * Returns a new Date object representing the current or given date/time converted to Indian Standard Time (IST).
 * When using the returned Date object, its local methods (e.g. getHours(), getDate()) will return the values in IST.
 */
export const getISTDate = (d = new Date()): Date => {
  const offsetDiff = (d.getTimezoneOffset() + 330) * 60 * 1000;
  return new Date(d.getTime() + offsetDiff);
};

/**
 * Returns the current time in IST as a Date object.
 */
export const getISTNow = (): Date => {
  return getISTDate(new Date());
};

/**
 * Formats a deadline date string as a readable IST date and time.
 * e.g. "15 Jul 2026, 10:30 AM IST"
 */
export const formatDeadlineIST = (deadline: string): string => {
  if (!deadline) return "—";
  try {
    const date = new Date(deadline);
    if (isNaN(date.getTime())) return deadline;
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) + " IST";
  } catch {
    return deadline;
  }
};
