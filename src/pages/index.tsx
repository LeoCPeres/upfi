import { Button, Box } from "@chakra-ui/react";
import { useMemo } from "react";
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

var teste = {
  pages: [
    {
      data: [
        {
          title: "Doge",
          description: "The best doge",
          url: "https://i.ibb.co/K6DZdXc/minh-pham-LTQMgx8t-Yq-M-unsplash.jpg",
          ts: 1620222828340000,
          id: "294961059684418048",
        },
        {
          title: "Cachorrinho gif",
          description: "A Gracie é top",
          url: "https://i.ibb.co/r3NbmgH/ezgif-3-54a30c130cef.gif",
          ts: 1620222856980000,
          id: "295991055792210435",
        },
        {
          title: "React",
          description: "Dan Abramov",
          url: "https://i.ibb.co/864qfG3/react.png",
          ts: 1620223108460000,
          id: "295991069654385154",
        },
        {
          title: "Ignite",
          description: "Wallpaper Celular",
          url: "https://i.ibb.co/DbfGQW5/1080x1920.png",
          ts: 1620223119610000,
          id: "295991085899973123",
        },
        {
          title: "Ignite",
          description: "Wallpaper PC 4k",
          url: "https://i.ibb.co/fvYLKFn/3840x2160.png",
          ts: 1620223133800000,
          id: "295991107279389188",
        },
        {
          title: "Paisagem",
          description: "Sunset",
          url: "https://i.ibb.co/st42sNz/petr-vysohlid-9fqw-Gq-GLUxc-unsplash.jpg",
          ts: 1620223149390000,
          id: "295991128736399874",
        },
      ],
      after: "295991160078336512",
    },
  ],
  pageParams: [null],
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
    { getNextPageParam: (lastPage) => lastPage.after ?? null }
  );

  const formattedData: Card[] = useMemo<Card[]>(() => {
    const response = teste?.pages
      .map((x) => {
        return x.data;
      })
      .flat();

    return response;
  }, [teste]);

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
