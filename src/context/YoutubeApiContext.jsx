import { createContext, useContext } from "react";
// import FakeYoutube from "../api/fakeYoutube";
import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient";

export const YoutubeApiContext = new createContext();

const client = new YoutubeClient();
const youtube = new Youtube(client);
// const youtube = new FakeYoutube();

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
