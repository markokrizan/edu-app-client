import { DateTime } from "luxon";

const formatDate = (
  rawDateString: string,
  format: string = "yyyy-LL-dd",
  zone = "utc"
): string => {
  if (!rawDateString || !format) {
    return "";
  }

  const parsed = DateTime.fromISO(rawDateString, { zone });

  if (parsed.invalid) {
    console.error(`${rawDateString} could not be parsed!`);

    return "";
  }

  return parsed.toFormat(format);
};

export default {
  formatDate,
};
