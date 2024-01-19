export const timeAgo = (date: string) => {
  const seconds = Math.floor((new Date().getTime() - Date.parse(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  if (seconds < 10) return "just now";

  return Math.floor(seconds) + " seconds ago";
};

export const isValidHttpUrl = (testString: string) => {
  if (
    testString.startsWith("http:") ||
    testString.startsWith("https:") ||
    testString.startsWith("www.")
  )
    return true;
  let url;

  try {
    url = new URL(testString);
    console.log(url);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};
