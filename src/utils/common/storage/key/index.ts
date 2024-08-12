const STORAGE_KEY = {
  AUTH_USER: "authUser",

  STICKY: {
    DEVICE_TOKEN: "deviceToken",
    AOS_VERSION: "aosVersion",
    IOS_VERSION: "iosVersion",
  } as const,
} as const;

export const SESSIONSTORAGE_KEY = {};

export default STORAGE_KEY;
