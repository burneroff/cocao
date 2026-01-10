"use client";

import Image from "next/image";
import { useState } from "react";
import { Cross } from "../icons/Cross";

const getProductImage = (productName: string) => {
  return `/products/${productName}.png`;
};

export default function Products() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Структура таблицы по строкам (3 колонки, 6 строк)
  const tableRows: Array<
    Array<{
      type: "text" | "frame" | "empty";
      content?: string;
      frameImage?: string;
    }>
  > = [
    // Строка 1
    [
      { type: "text", content: "PDF Converter" },
      { type: "empty" },
      { type: "text", content: "Zipper" },
    ],
    // Строка 2
    [
      { type: "frame", frameImage: "/frames/frame_products_1.png" },
      { type: "text", content: "Call Recorder" },
      { type: "text", content: "FAX" },
    ],
    // Строка 3
    [
      { type: "text", content: "Sense" },
      { type: "text", content: "AI Calorie Counter" },
      { type: "empty" },
    ],
    // Строка 4
    [
      { type: "text", content: "Sense Meditation" },
      { type: "empty" },
      { type: "frame", frameImage: "/frames/frame_products_2.png" },
    ],
    // Строка 5
    [
      { type: "empty" },
      { type: "text", content: "Fleeky-Wallpapers" },
      { type: "text", content: "VEON" },
    ],
    // Строка 6
    [
      { type: "text", content: "Plant ID & Care" },
      { type: "empty" },
      { type: "empty" },
    ],
  ];

  return (
    <div className="h-[280vh] flex  items-center justify-end px-16 py-16 relative">
      <table className="border-collapse flex justify-end">
        <tbody>
          {tableRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, colIndex) => {
                const index = rowIndex * 3 + colIndex;

                if (item.type === "text") {
                  return (
                    <td
                      key={colIndex}
                      className="w-[303px] h-[303px] border border-[#9F9B96] relative overflow-hidden cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="w-full h-full flex items-center justify-center relative">
                        <div
                          className={`text-[40px] text-[#3F3E3D] font-normal text-center px-4 z-10 transition-opacity duration-300 ${
                            hoveredIndex === index ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          {item.content}
                        </div>
                        <div
                          className={`absolute overflow-hidden transition-transform duration-500 ease-out ${
                            hoveredIndex === index
                              ? "translate-y-0"
                              : "-translate-y-full"
                          }`}
                          style={{
                            top: "-1px",
                            left: "-1px",
                            right: "-1px",
                            bottom: "-1px",
                          }}
                        >
                          <Image
                            src={getProductImage(item.content || "")}
                            alt={item.content || ""}
                            width={305}
                            height={305}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </td>
                  );
                } else if (item.type === "frame" && item.frameImage) {
                  return (
                    <td
                      key={colIndex}
                      className="w-[303px] h-[303px] flex items-center justify-center"
                    >
                      <Image
                        src={item.frameImage}
                        alt="Product frame"
                        width={184}
                        height={184}
                        className="w-[184px] h-[184px] object-contain"
                      />
                    </td>
                  );
                } else {
                  return <td key={colIndex} className="w-[303px] h-[303px]" />;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Frame products 3 с крестами справа */}
      <div className="absolute bottom-[100px] w-[184px] h-[184px]">
        <Image
          src="/frames/frame_products_3.png"
          alt="Frame products 3"
          width={184}
          height={184}
          className="w-full h-full object-contain"
        />

        {/* Кресты справа от картинки: 60px отступ вбок, 50px между крестами по высоте */}
        {/* Первый Cross: 60px вправо от картинки, вверху */}
        <div className="absolute top-[-60px] right-[-50px]">
          <Cross color="#9F9B96" />
        </div>

        {/* Третий Cross: 60px вправо от картинки, 100px ниже первого */}
        <div className="absolute bottom-[-60px] right-[-50px]">
          <Cross color="#9F9B96" />
        </div>
      </div>
    </div>
  );
}
