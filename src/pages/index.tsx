import { Button, Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";

import { Header } from "../components/Header";
import { CardList } from "../components/CardList";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type fetchImagesResponse = {
  data: Card[];
  after: string | null;
};

export default function Home(): JSX.Element {
  async function getImages({ pageParam = null }): Promise<fetchImagesResponse> {
    if (pageParam) {
      const { data } = await api.get(`/images`, {
        params: { after: pageParam },
      });
      return data;
    }

    const { data } = await api.get("/images");
    return data;
  }

  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "images",
    getImages,
    { getNextPageParam: (lastPage) => lastPage.after }
  );

  const formattedData: Card[] = useMemo<Card[]>(() => {
    const response = data?.pages
      .map((x) => {
        return x.data;
      })
      .flat();

    return response;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage ? (
          <Button w="134px" h="40px" background="orange.500" color="pGray.50" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
          </Button>
        ) : (
          ""
        )}
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
