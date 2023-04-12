import { DateTime } from "luxon";

const formatDate = (rawDateString: string, format: string = "yyyy-LL-dd"): string => {
  if (!rawDateString || !format) {
    return '';
  }

  const parsed = DateTime.fromISO(rawDateString);

  if (parsed.invalid) {
    console.error(`${rawDateString} could not be parsed!`);

    return '';
  }
  
  return parsed.toFormat(format);
};

export default {
  formatDate,
};
