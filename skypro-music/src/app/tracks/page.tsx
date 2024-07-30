"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { trackType } from "@/types";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { getTracks } from "@/api/tracks";
import Filters from "@/components/Filters/Filters";
import Centerblock from "@/components/Centerblock/Centerblock";

export default function MainTracksPage() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<trackType[]>([]);
  const filteredTracks = useAppSelector(
    (state) => state.playlist.filteredTracks
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getTracks()
      .then((tracksData) => {
        setTracks(tracksData);
        dispatch(setInitialTracks({ initialTracks: tracksData }));
        setIsLoading(false);
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }, [dispatch]);
  return (
    <>
      <Filters />
      <Centerblock isLoading = {isLoading} tracks={filteredTracks} playlist={tracks}  />
    </>
  );
}
