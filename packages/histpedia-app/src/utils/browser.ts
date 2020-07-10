import { UAParser } from 'ua-parser-js';

/**
 * format
 */
const format = (word: string) => {
  const sanitizedWords = [];
  const words = word.split(' ');

  for (let i = 0, len = words.length; i < len; i += 1) {
    const sanitizedWord = words[i]
      .replace(/\[|\]/g, '')
      .replace(/\//g, '-')
      .toLowerCase();

    if (sanitizedWord.length > 0) {
      sanitizedWords.push(sanitizedWord);
    }
  }

  return sanitizedWords.join('-');
};

/**
 * isString
 */
const isString = (arg: any): arg is string => {
  return typeof arg === 'string';
};

const uaParser = new UAParser();
let browserName = uaParser.getBrowser().name;
let browserVersion = uaParser.getBrowser().version;
let deviceType = uaParser.getDevice().type;
let osName = uaParser.getOS().name;
let osVersion = uaParser.getOS().version;

browserName = isString(browserName) ? format(browserName) : undefined;
browserVersion = isString(browserVersion) ? format(browserVersion) : undefined;
deviceType = isString(deviceType) ? format(deviceType) : undefined;
osName = isString(osName) ? format(osName) : undefined;
osVersion = isString(osVersion) ? format(osVersion) : undefined;

export const BROWSER_NAME = browserName;
export const BROWSER_VERSION = browserVersion;
export const DEVICE_TYPE = deviceType;
export const OS_NAME = osName;
export const OS_VERSION = osVersion;

// Browser
export const IS_IE = BROWSER_NAME === 'ie';
export const IS_CHROME =
  BROWSER_NAME === 'chrome' ||
  BROWSER_NAME === 'chrome-headless' ||
  BROWSER_NAME === 'chrome-webview' ||
  BROWSER_NAME === 'chromium';
export const IS_FIREFOX = BROWSER_NAME === 'firefox';
export const IS_EDGE = BROWSER_NAME === 'edge';
export const IS_SAFARI =
  BROWSER_NAME === 'safari' || BROWSER_NAME === 'mobile-safari';

// OS
export const IS_MOBILE = DEVICE_TYPE === 'mobile';
export const IS_TABLET = DEVICE_TYPE === 'tablet';
export const IS_WINDOWS_PHONE = OS_NAME === 'windows-phone-mobile';
export const IS_ANDROID = OS_NAME === 'android';
export const IS_ANDROID_MOBILE = IS_ANDROID && IS_MOBILE;
export const IS_ANDROID_TABLET = IS_ANDROID && IS_TABLET;
export const IS_IOS = OS_NAME === 'ios';
export const IS_IOS_MOBILE = IS_IOS && IS_MOBILE;
export const IS_IOS_TABLET = IS_IOS && IS_TABLET;
export const IS_MAC = OS_NAME === 'mac-os';
export const IS_WINDOWS = OS_NAME === 'windows';

export default {
  BROWSER_NAME,
  BROWSER_VERSION,
  DEVICE_TYPE,
  OS_NAME,
  OS_VERSION,
  IS_IE,
  IS_CHROME,
  IS_FIREFOX,
  IS_EDGE,
  IS_SAFARI,
  IS_MOBILE,
  IS_TABLET,
  IS_WINDOWS_PHONE,
  IS_ANDROID,
  IS_ANDROID_MOBILE,
  IS_ANDROID_TABLET,
  IS_IOS,
  IS_IOS_MOBILE,
  IS_IOS_TABLET,
  IS_MAC,
  IS_WINDOWS,
};
