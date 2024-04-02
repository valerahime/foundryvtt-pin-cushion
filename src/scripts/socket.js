import CONSTANTS from "./constants.js";
import API from "./api.js";
import { debug } from "./lib/lib.js";
import { setSocket } from "../module.js";

export let pinCushionSocket;
export function registerSocket() {
  debug("Registered pinCushionSocket");
  if (pinCushionSocket) {
    return pinCushionSocket;
  }

  pinCushionSocket = socketlib.registerModule(CONSTANTS.MODULE_ID);

  pinCushionSocket.register("requestEvent", (...args) => API.requestEventArr(...args));
  pinCushionSocket.register("setNoteRevealed", (...args) => API.setNoteRevealedArr(...args));

  setSocket(pinCushionSocket);
  return pinCushionSocket;
}
