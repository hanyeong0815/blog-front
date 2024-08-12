import STORAGE_KEY from "./key";

const StorageManager = {
  setItem: (key: string, value: string) => localStorage.setItem(key, value),

  getItem: (key: string) => localStorage.getItem(key),

  clearAllUnsticky: () => {
    type T = { [key: string]: string };
    const stickyKeys = Object.keys(STORAGE_KEY.STICKY);
    const stickyObject = Object.keys(localStorage).reduce<T>(
      (acc, keyName) =>
        stickyKeys.includes(keyName)
          ? { ...acc, [keyName]: localStorage.getItem(keyName)! }
          : acc,
      {}
    );

    localStorage.clear();

    Object.keys(stickyObject).forEach((keyName) =>
      localStorage.setItem(keyName, stickyObject[keyName])
    );
  },
};

export default StorageManager;
