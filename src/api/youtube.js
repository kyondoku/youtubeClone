import axios from "axios";

export default class Youtube {
  //   constructor() {
  //     this.httpClient = axios.create({
  //       baseURL: "https://www.googleapis.com/youtube/v3",
  //       params: {
  //         key: process.env.REACT_APP_YOUTUBE_API_KEY,
  //       },
  //     });
  //   }
  // 외부로부터 필요한 디펜던시를 주입받는다(DI)
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    // 함수앞에 #을 붙이면 private함수(class 외부에서 호출불가)
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: "snippet", id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideos(channelId) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          channelId,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #searchByKeyword(keyword) {
    // fetch의 문제점 - json으로 변환필요, 백엔드쪽에서 404, 400과 같은 에러코드들을 성공으로 간주한다(어쨌든 response가 있었으므로)
    return this.apiClient
      .search({
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
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostpopular",
        },
      })
      .then((res) => res.data.items);
  }
}
