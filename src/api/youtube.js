import axios from "axios";

export async function search(keyword) {
  // fetch의 문제점 - json으로 변환필요, 백엔드쪽에서 404, 400과 같은 에러코드들을 성공으로 간주한다(어쨌든 response가 있었으므로)
  return axios
    .get(`/videos/${keyword ? "search" : "popular"}.json`)
    .then((res) => res.data.items);
}
