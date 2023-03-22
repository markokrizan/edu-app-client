import { DateTime } from "luxon";

const formatDate = (rawDateString: string, format: string = "YYYY-MM-DD"): string => {
  if (!rawDateString || !format) {
    return '';
  }

  const parsed = DateTime.fromISO(rawDateString);

  if (parsed.invalid) {
    console.error(`${rawDateString} could not be parsed!`);

    return '';
  }
  
  return parsed.toISODate();
};

export default {
  formatDate,
};
