"use client";

import Image from "next/image";
import { useState } from "react";
import { Cross } from "../icons/Cross";

const getProductImage = (productName: string) => {
  return `/products/${productName}.png`;
};

export default function Products() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const tableRows: Array<
    Array<{
      type: "text" | "frame" | "empty";
      content?: string;
      frameImage?: string;
    }>
  > = [
    [
      { type: "text", content: "PDF Converter" },
      { type: "empty" },
      { type: "text", content: "Zipper" },
    ],
    [
      { type: "frame", frameImage: "/frames/frame_products_1.png" },
      { type: "text", content: "Call Recorder" },
      { type: "text", content: "FAX" },
    ],
    [
      { type: "text", content: "Sense" },
      { type: "text", content: "AI Calorie Counter" },
      { type: "empty" },
    ],
    [
      { type: "text", content: "Sense Meditation" },
      { type: "empty" },
      { type: "frame", frameImage: "/frames/frame_products_2.png" },
    ],
    [
      { type: "empty" },
      { type: "text", content: "Fleeky-Wallpapers" },
      { type: "text", content: "VEON" },
    ],
    [
      { type: "text", content: "Plant ID & Care" },
      { type: "empty" },
      { type: "empty" },
    ],
  ];

  return (
    <div className="min-h-screen flex flex-col justify-end px-4 py-4 sm:px-16 sm:py-16 pt-50 pb-50 sm:pt-100 sm:pb-100 relative">
      <div className="w-full max-w-[909px]">
        <table className="w-full table-fixed border-collapse">
          <tbody>
            {tableRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((item, colIndex) => {
                  const index = rowIndex * 3 + colIndex;

                  const hasBorder = item.type === "text";

                  return (
                    <td
                      key={colIndex}
                      className={hasBorder ? "border border-[#9F9B96]" : ""}
                    >
                      <div className="w-full max-w-[303px] aspect-square mx-auto relative overflow-hidden">
                        {/* TEXT */}
                        {item.type === "text" && (
                          <div
                            className="w-full h-full flex items-center justify-center cursor-pointer relative"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            <div
                              className={`text-[clamp(20px,3vw,40px)] text-[#3F3E3D] text-center px-4 z-10 transition-opacity duration-300 ${
                                hoveredIndex === index
                                  ? "opacity-0"
                                  : "opacity-100"
                              }`}
                            >
                              {item.content}
                            </div>

                            <div
                              className={`absolute inset-0 transition-transform duration-500 ease-out ${
                                hoveredIndex === index
                                  ? "translate-y-0"
                                  : "-translate-y-full"
                              }`}
                            >
                              <Image
                                src={getProductImage(item.content || "")}
                                alt={item.content || ""}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {/* FRAME (БЕЗ ОБВОДКИ) */}
                        {item.type === "frame" && item.frameImage && (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image
                              src={item.frameImage}
                              alt="Product frame"
                              width={184}
                              height={184}
                              className="max-w-[60%] max-h-[60%] object-contain"
                            />
                          </div>
                        )}

                        {/* EMPTY (БЕЗ ОБВОДКИ) */}
                        {item.type === "empty" && (
                          <div className="w-full h-full" />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full h-[240px] sm:h-[388px] relative">
        {/* Frame products 3 */}
        <div className="absolute bottom-0 w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_products_3.png"
            alt="Frame products 3"
            fill
            className="object-contain"
          />

          <div className="absolute top-[-60px] right-[-50px]">
            <Cross color="#9F9B96" />
          </div>

          <div className="absolute bottom-[-60px] right-[-50px]">
            <Cross color="#9F9B96" />
          </div>
        </div>
      </div>
    </div>
  );
}
