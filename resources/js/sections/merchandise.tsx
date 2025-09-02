import { Button } from "@/components/ui/button";
import SliderWithDots from "@/components/ui/slider-with-dot"
const Cards = [
  { image: "/images/Baju.jpg" },
  { image: "/images/Baju.jpg" },
  { image: "/images/Baju.jpg" },
  
];


export default function Merchandise() {
    const cardsItem = [...Cards];

    return (
        <div className="bg-black p-7 overflow-hidden w-full">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-yellow-300 text-3xl font-justme ">
                        Official Merchandise
                    </h2>
                </div>
                <div>
                    <Button className="font-sans text-lg border-2 border-yellow-300 rounded-4xl bg-transparent cursor-pointer text-yellow-300 font-extrabold ">
                        SEE MORE
                    </Button>
                </div>
            </div>
            <div className="grid justify-center mt-6">
                <div className="">
                  
                    <SliderWithDots items={cardsItem}></SliderWithDots>
                </div>
                
            </div>

        </div>
    );
}
