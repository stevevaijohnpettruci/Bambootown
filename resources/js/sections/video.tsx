import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Cards = [
    {
        items: "Card 1",
        href : "/",
    },
    {
        items: "Card 2",
        href : "/",
    },
    {
        items: "Card 3",
        href : "/",
    },
    {
        items: "Card 4",
        href : "/",
    },
    {
        items: "Card 5",
        href : "/",
    },

];

export default function Videos() {
    const cardsItem = [...Cards];

    return (
        <div className="bg-[#FFE760] p-7 overflow-hidden w-full">
            <div className="flex justify-between">
                <div>
                <h2 className="text-black text-3xl font-justme mb-4">
                    Our Videos
                </h2>
                </div>
                <div>
                <Button className="font-sans text-lg border-2 border-black rounded-4xl bg-transparent cursor-pointer text-black font-extrabold ">
                    SEE MORE
                </Button>
                </div>
            </div>
            <div className="flex justify-center  mt-2">
                <div className="grid grid-cols-4 gap-3 mb-8">
                    {cardsItem.map((card,idx)=>(
                        <Card key={idx} className="h-60 w-60 text-center justify-center" >{card.items}</Card>
                    ))}
                </div>
            </div>

        </div>
    );
}
