import axios from "axios";

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });
  }

  async search(keyword) {
    // 함수앞에 #을 붙이면 private함수(class 외부에서 호출불가)
    return keyword ? this.#searchByKeyword() : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    // fetch의 문제점 - json으로 변환필요, 백엔드쪽에서 404, 400과 같은 에러코드들을 성공으로 간주한다(어쨌든 response가 있었으므로)
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    // fetch의 문제점 - json으로 변환필요, 백엔드쪽에서 404, 400과 같은 에러코드들을 성공으로 간주한다(어쨌든 response가 있었으므로)
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostpopular",
        },
      })
      .then((res) => res.data.items);
  }
}
