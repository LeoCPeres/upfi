import { SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "./Card";
import { ModalViewImage } from "./Modal/ViewImage";

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgUrl, setImgUrl] = useState("");

  // TODO SELECTED IMAGE URL STATES

  // TODO FUNCTION HANDLE VIEW IMAGE
  const handleViewImage = (url: string) => {
    setImgUrl(url);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map((card) => {
          return <Card data={card} viewImage={(url) => handleViewImage(url)} key={card.id}></Card>;
        })}
      </SimpleGrid>

      {
        // TODO MODALVIEWIMAGE

        isOpen && <ModalViewImage imgUrl={imgUrl} isOpen={isOpen} onClose={onClose} />
      }
    </>
  );
}
