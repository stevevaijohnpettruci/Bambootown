import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BackgroundImage from "@/components/ui/background-image";

const Cards = [
    { items: "Card 1", href: "/" },
    { items: "Card 2", href: "/" },
    { items: "Card 3", href: "/" },
    { items: "Card 4", href: "/" },
    { items: "Card 5", href: "/" },
    { items: "Card 6", href: "/" },
    { items: "Card 7", href: "/" },
    { items: "Card 8", href: "/" },
];

export default function Videos() {
    const cardsItem = [...Cards];

    return (
        <main className="w-full">
            <BackgroundImage src="/Background Image-2.jpeg" alt="">
                <div className="bg-black/50 backdrop-blur-sm w-full min-h-screen">
                    <div className="flex justify-between items-center bg-[#FFE760] w-full px-6 py-6 gap-2">
                        <h2 className="text-black text-3xl font-justme">Our Videos</h2>
                        <Button className="font-sans text-lg border-2 border-black rounded-4xl bg-transparent cursor-pointer text-black font-extrabold">
                            SEE MORE
                        </Button>
                    </div>
                    <div className="flex justify-center mt-10 ">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cardsItem.map((card, idx) => (
                                <Card key={idx} className="h-40 w-60 flex items-center justify-center text-center">
                                    {card.items}
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div className="py-7 items-center justify-center flex flex-col gap-5">
                        <h1 className="text-center font-extrabold text-xl text-white">SEE OUR ACTIVITIES AND SUPPORT US HERE</h1>
                        <Button className="bg-transparent text-yellow-300 border-2 rounded-2xl border-yellow-300 font-bold text-lg cursor-pointer">CLICK HERE</Button>
                    </div>
                </div>
            </BackgroundImage>
        </main>
    );
}
