export const telekomEmailRegex = /^[a-zA-Z0-9._%+-]+@t-systems\.[a-zA-Z]{2,}$/;
export const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
export const licensePlateRegexPatterns = {
  US: /^[A-Z0-9]{1,7}$/,
  CA: /^[A-Z0-9]{1,7}$/,
  GB: /^[A-Z0-9]{1,7}$/,
  FR: /^[A-Z0-9]{1,7}$/,
  DE: /^[A-Z0-9]{1,8}$/,
  AU: /^[A-Z0-9]{1,6}$/,
  IN: /^[A-Z0-9]{1,10}$/,
  JP: /^[0-9]{2}[A-Z0-9]{2}-[0-9]{1,4}$/,
  BR: /^[A-Z]{3}[0-9]{1,4}$/,
  CN: /^[A-Z0-9]{1,5}[A-Z]{1}[A-Z0-9]{1,6}$/,
  RU: /^[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{2}$/,
  ZA: /^[A-Z]{2}[0-9]{2}[A-Z]{2}$/,
  AL: /^[A-Z0-9]{1,10}$/,
  AT: /^[A-Z]{1,2}[0-9]{1,4}$/,
  BE: /^[A-Z0-9]{1,8}$/,
  BG: /^[A-Z0-9]{4,8}$/,
  HR: /^[A-Z0-9]{1,7}$/,
  CY: /^[A-Z0-9]{1,8}$/,
  CZ: /^[0-9]{2}[A-Z]{1}[0-9]{1,4}$/,
  DK: /^[A-Z0-9]{1,8}$/,
  EE: /^[A-Z0-9]{1,9}$/,
  FI: /^[A-Z0-9]{2,7}$/,
  GR: /^[A-Z0-9]{1,7}$/,
  HU: /^[A-Z0-9]{1,6}$/,
  IS: /^[A-Z]{2}[0-9]{3}$/,
  IE: /^[0-9]{2}[A-Z]{1,2}[0-9]{1,5}$/,
  IT: /^[A-Z0-9]{2,7}$/,
  LV: /^[A-Z0-9]{1,9}$/,
  LT: /^[A-Z0-9]{1,8}$/,
  LU: /^[0-9]{1,4}[A-Z]{1,2}$/,
  MT: /^[A-Z]{3}[0-9]{1,4}$/,
  NL: /^[A-Z0-9]{2}-[0-9]{2}-[A-Z0-9]{1,2}$/,
  NO: /^[A-Z0-9]{2,7}$/,
  PL: /^[A-Z0-9]{1,7}$/,
  PT: /^[0-9]{2}-[0-9]{2}-[A-Z0-9]{1,6}$/,
  RO: /^[A-Z]{1,2}[0-9]{1,6}$/,
  SK: /^[A-Z]{2}[0-9]{2,4}$/,
  SI: /^[A-Z0-9]{1,7}$/,
  ES: /^[0-9]{4}-[A-Z]{3}$/,
  SE: /^[A-Z0-9]{1,6}$/,
  CH: /^[A-Z0-9]{1,7}$/,
  KR: /^[0-9]{2}[A-Z]{2}[0-9]{1,2}$/,
  TR: /^[0-9]{2}[A-Z]{1,2}[0-9]{1,3}$/,
  SG: /^[A-Z]{2}[0-9]{1,4}[A-Z]{1}$/,
  MY: /^[A-Z]{1,2}[0-9]{1,4}$/,
  MX: /^[A-Z0-9]{1,7}$/,
  AR: /^[A-Z]{3}[0-9]{1,4}$/,
  CL: /^[A-Z]{1,2}[0-9]{1,4}$/,
  TH: /^[0-9]{2}[A-Z]{1,2}[0-9]{1,4}$/,
  ID: /^[A-Z]{1,2}[0-9]{1,4}[A-Z]{1,2}$/,
  VN: /^[0-9]{2}[A-Z]{1}[0-9]{2}-[0-9]{2}$/,
};

export default { telekomEmailRegex, phoneNumberRegex, licensePlateRegexPatterns };
