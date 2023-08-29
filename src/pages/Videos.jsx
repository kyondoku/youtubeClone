import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Routes, useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import axios from "axios";

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["vidoes", keyword], async () => {
    // fetch의 문제점 - json으로 변환필요, 백엔드쪽에서 404, 400과 같은 에러코드들을 성공으로 간주한다(어쨌든 response가 있었으므로)
    return axios
      .get(`/videos/${keyword ? "search" : "popular"}.json`)
      .then((res) => res.data.items);
  });

  return (
    <>
      <div>Videos {keyword ? `🔍${keyword}` : "🔥"}</div>
      {isLoading && <p>Loading..</p>}
      {error && <p>Something is wrong</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
