import { useRef } from "react";
import { SliderItem } from "@/types"; // atau wherever index.d.ts berada

type SliderWithDotsProps = {
  items: SliderItem[];
};

export default function SliderWithDots({ items }: SliderWithDotsProps) {
  

  return (
    <div className="space-y-4">
      <div
        
        className="overflow-x-auto whitespace-nowrap space-x-4 flex p-4"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="inline-block w-100 h-110 rounded-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={`slide-${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {items.map((_, idx) => (
          <div
            key={idx}
           
            className="w-3 h-3 bg-gray-400 rounded-full hover:bg-yellow-300 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
