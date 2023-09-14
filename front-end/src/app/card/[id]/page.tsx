
import CardForm from "@/components/cards/cardForm";
import React from "react"

const CardPage = ({ params: { id: cardId } }: { params: { id: string } }) => {

    return <CardForm cardId={cardId} />

};

export default CardPage;
