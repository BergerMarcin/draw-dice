import * as variablesFromScss from "../scss/variables.module.scss";

export const APP_BACKGROUND_BASIC = variablesFromScss.appBackgroundBasic;

export const STORAGE_KEY = "draw_dice_results";

/* ---------------- GAME ----------------- */

export const MAX_ROUNDS = 30;

//in case draw-API failed
export const DEFAULT_START_DRAW = 3;

export const CHOICE = {
  HIGHER: "higher",
  LOWER: "lower",
};

export const CHOICE_POINTS = {
  CORRECT: 0.1,
  WRONG: 0,
};

export const SCORE_FRACTION_DIGITS = 1;

/* ---------------- API ----------------- */

export const API_PATH_DRAW = []; // decided to use only host for cors-server without pathname (previously: ["json", "d6"])

export const API_PATH_IMG = ["images", "poorly-drawn", "d6"];

export const API_ERROR = {
  UNKNOWN: {
    // prettier-ignore
    DEV_MSG: "Unknown error\n(code error \"Unknown error\")",
    // prettier-ignore
    USER_MSG: "Please contact HelpDesk (code error \"Unknown error\")",
  },
  NO_URL_HOST: {
    DEV_MSG: "No host URL, check process.env\n(code error A1)",
    USER_MSG: "Please contact HelpDesk (code error A1)",
  },
  WRONG_URL: {
    DEV_MSG: "Wrong API URL or pathname\n(code error A2)",
    USER_MSG: "Please contact HelpDesk (code error A2)",
  },
  WRONG_RESPONSE_STATUS: {
    DEV_MSG: "API response status not valid\n(code error A3)",
    USER_MSG: "Please contact HelpDesk (code error A3)",
  },
  GENERAL_RESPONSE_ERROR: {
    DEV_MSG: "General API response error (code error A4)",
    USER_MSG: "Please check internet connection. If the error occurs again, please contact HelpDesk (code error A4)",
  },
};
