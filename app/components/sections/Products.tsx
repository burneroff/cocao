"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Cross } from "../icons/Cross";

// Маппинг имен продуктов на имена файлов изображений
const productImageMap: { [key: string]: string } = {
  "Fleeky": "Fleeky-Wallpapers",
  // Добавьте другие несоответствия здесь, если они есть
};

const getProductImage = (productName: string) => {
  const imageName = productImageMap[productName] || productName;
  return `/products/${imageName}.png`;
};


// Маппинг продуктов на ссылки App Store
const productLinks: { [key: string]: string } = {
  "PDF Converter": "https://apps.apple.com/by/app/pdf-scanner-scan-documents/id1561802302",
  "Zipper": "https://apps.apple.com/us/app/zip-extractor-unzip-unrar/id6443985825",
  "Call Recorder": "https://apps.apple.com/us/app/the-voice-recorder-call-%D0%BC%D0%B5%D0%BC%D0%BEs/id6475734022",
  "FAX": "https://apps.apple.com/us/app/recieve-fax-send-receive/id1627433298",
  "AI Calorie Counter": "https://apps.apple.com/us/app/ai-calorie-counter-meal-plan/id6749527794",
  "Sense": "https://apps.apple.com/us/app/guided-meditation-calm-rabbit/id1584776535",
  "NookAI": "https://apps.apple.com/us/app/ai-room-planner-nookai-design/id6752864212",
  "Fleeky": "https://apps.apple.com/us/app/fleeky-wallpapers-theme/id6478114730",
  "VEON": "https://apps.apple.com/us/app/ai-cosmetic-scanner-v%C3%A9on/id6742449597",
  "Plant ID & Care": "https://apps.apple.com/us/app/plant-id-care-planthy-ai/id6504182856",
};

// Маппинг продуктов на secondText (текст после " - ")
const productSecondText: { [key: string]: string } = {
  "PDF Converter": "6K+ Users 300K+ Downloads",
  "Zipper": "1K+ Users 29K+ Downloads",
  "Call Recorder": "500+ Users 6K+ Downloads",
  "FAX": "700+ Users 18K+ Downloads",
  "Sense": "1K+ Users 21K+ Downloads",
  "AI Calorie Counter": "120K+ Users 600K+ Downloads",
  "NookAI": "13K+ Users 100K+ Downloads",
  "Fleeky": "60K+ Users 700K+ Downloads",
  "VEON": "500+ Users 3K+ Downloads",
  "Plant ID & Care": "1K+ Users 10K+ Downloads",
};

// Функция для форматирования secondText с переносом строки после "Users" (для десктопа)
const formatSecondText = (text: string) => {
  return text.replace(/Users\s+/g, "Users\n");
};

// Функция для форматирования secondText с переносом строки перед "Users", после "Users" и перед "Downloads" (для мобильных)
const formatSecondTextMobile = (text: string) => {
  return text
    .replace(/\s+Users/g, " Users")
    .replace(/Users\s+/g, "Users\n")
    .replace(/\s+Downloads/g, "\nDownloads");
};

// Маппинг продуктов на группы для последовательной анимации
const productGroups: { [key: string]: number } = {
  "PDF Converter": 1,
  "FAX": 1,
  "AI Calorie Counter": 1,
  "VEON": 1,
  "Call Recorder": 2,
  "Zipper": 2,
  "NookAI": 2,
  "Sense": 3,
  "Fleeky": 3,
  "Plant ID & Care": 3,
};

export default function Products() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringProduct, setIsHoveringProduct] = useState(false);
  const [showSecondText, setShowSecondText] = useState<{ [key: number]: boolean }>({});
  const [isDesktop, setIsDesktop] = useState(false);
  const currentGroupRef = useRef<number>(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const shouldResetAllRef = useRef<boolean>(false);

  // Определение размера экрана (десктоп или мобильный)
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint в Tailwind
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  // Автоматическое переключение между content и secondText по группам
  useEffect(() => {
    const toggleTextForGroup = (groupNum: number) => {
      // Если нужно сбросить все элементы (после группы 3)
      if (shouldResetAllRef.current) {
        setShowSecondText((prev) => {
          const allTextIndices: number[] = [];
          tableRows.forEach((row, rowIndex) => {
            row.forEach((item, colIndex) => {
              if (item.type === "text" && item.secondText && item.content) {
                const index = rowIndex * 3 + colIndex;
                allTextIndices.push(index);
              }
            });
          });

          const newState: { [key: number]: boolean } = {};
          allTextIndices.forEach((idx) => {
            newState[idx] = false; // Сбрасываем на content
          });
          return { ...prev, ...newState };
        });
        shouldResetAllRef.current = false;
        currentGroupRef.current = 1;
        return;
      }

      // Находим все индексы элементов с secondText для текущей группы
      const textIndices: number[] = [];
      tableRows.forEach((row, rowIndex) => {
        row.forEach((item, colIndex) => {
          if (item.type === "text" && item.secondText && item.content) {
            const productGroup = productGroups[item.content];
            if (productGroup === groupNum) {
              const index = rowIndex * 3 + colIndex;
              textIndices.push(index);
            }
          }
        });
      });

      // Переключаем текст только для текущей группы (все элементы группы одновременно)
      if (textIndices.length > 0) {
        setShowSecondText((prev) => {
          const newState: { [key: number]: boolean } = {};
          textIndices.forEach((idx) => {
            newState[idx] = !prev[idx];
          });
          return { ...prev, ...newState };
        });
      }

      // Если это была последняя группа (3), планируем сброс всех элементов в следующем цикле
      if (groupNum === 3) {
        shouldResetAllRef.current = true;
      } else {
        // Переходим к следующей группе
        currentGroupRef.current = groupNum + 1;
      }
    };

    // Запускаем интервал для переключения групп
    intervalRef.current = setInterval(() => {
      toggleTextForGroup(currentGroupRef.current);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const tableRows: Array<
    Array<{
      type: "text" | "frame" | "empty";
      content?: string;
      secondText?: string;
      frameImage?: string;
    }>
  > = [
      [
        { type: "text", content: "PDF Converter", secondText: productSecondText["PDF Converter"] },
        { type: "empty" },
        { type: "text", content: "Zipper", secondText: productSecondText["Zipper"] },
      ],
      [
        { type: "frame", frameImage: "/frames/frame_products_1.png" },
        { type: "text", content: "Call Recorder", secondText: productSecondText["Call Recorder"] },
        { type: "text", content: "FAX", secondText: productSecondText["FAX"] },
      ],
      [
        { type: "text", content: "Sense", secondText: productSecondText["Sense"] },
        { type: "text", content: "AI Calorie Counter", secondText: productSecondText["AI Calorie Counter"] },
        { type: "empty" },
      ],
      [
        { type: "text", content: "NookAI", secondText: productSecondText["NookAI"] },
        { type: "empty" },
        { type: "frame", frameImage: "/frames/frame_products_2.png" },
      ],
      [
        { type: "empty" },
        { type: "text", content: "Fleeky", secondText: productSecondText["Fleeky"] },
        { type: "text", content: "VEON", secondText: productSecondText["VEON"] },
      ],
      [
        { type: "text", content: "Plant ID & Care", secondText: productSecondText["Plant ID & Care"] },
        { type: "empty" },
        { type: "empty" },
      ],
    ];

  return (
    <div className="min-h-screen flex flex-col justify-end px-4 py-4 sm:px-16 sm:py-16  pb-50 sm:pt-100 sm:pb-100 relative">
      {/* Элемент, следующий за курсором - только на компьютере */}
      {isDesktop && isHoveringProduct && cursorPosition && (
        <div
          className="hidden md:block fixed pointer-events-none z-50"
          style={{
            left: `${cursorPosition.x + 15}px`,
            top: `${cursorPosition.y - 40}px`,
            width: "155px",
            height: "30px",
            backgroundColor: "#FAFAFA",
            borderRadius: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "25px",
            fontWeight: 500,
            lineHeight: "35px",
            letterSpacing: "0%",
            color: "#3F3E3D",
          }}
        >
          https://...
        </div>
      )}
      <div className=" max-w-[909px] flex" style={{ alignSelf: "flex-end" }}>
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
                          <a
                            href={item.content ? productLinks[item.content] || "#" : "#"}
                            target={item.content && productLinks[item.content] ? "_blank" : undefined}
                            rel={item.content && productLinks[item.content] ? "noopener noreferrer" : undefined}
                            className="w-full h-full flex items-center justify-center cursor-pointer relative"
                            onMouseEnter={() => {
                              if (isDesktop) {
                                setHoveredIndex(index);
                                setIsHoveringProduct(true);
                              }
                            }}
                            onMouseLeave={() => {
                              if (isDesktop) {
                                setHoveredIndex(null);
                                setIsHoveringProduct(false);
                                setCursorPosition(null);
                              }
                            }}
                            onMouseMove={(e) => {
                              if (isDesktop && item.type === "text") {
                                setCursorPosition({
                                  x: e.clientX,
                                  y: e.clientY,
                                });
                              }
                            }}
                            onClick={(e) => {
                              const link = item.content ? productLinks[item.content] : null;
                              if (!link) {
                                e.preventDefault();
                              }
                            }}
                          >
                            {(() => {
                              const hasSecondText = !!item.secondText;
                              const showSecond = showSecondText[index] || false;
                              const isHovered = hoveredIndex === index;

                              if (!hasSecondText) {
                                // Обычный текст без secondText
                                return (
                                  <div
                                    className={`text-[#3F3E3D] px-2 z-10 transition-opacity duration-300 text-center ${isHovered ? "opacity-0" : "opacity-100"
                                      } font-normal text-sm leading-[26px] md:font-medium md:text-[25px] md:leading-[35px]`}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }

                              // Анимация перелистывания
                              return (
                                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                  {/* Content текст */}
                                  <div
                                    className={`absolute text-[#3F3E3D] px-2 z-10 transition-all duration-200 ease-in-out font-normal text-sm leading-[26px] md:font-medium md:text-[25px] md:leading-[35px] text-center ${isHovered || showSecond
                                      ? "opacity-0 -translate-y-full"
                                      : "opacity-100 translate-y-0"
                                      }`}
                                  >
                                    {item.content}
                                  </div>

                                  {/* SecondText - Mobile */}
                                  <div
                                    className={`absolute text-[#3F3E3D] px-2 z-10 transition-all duration-200 ease-in-out font-normal text-sm leading-[26px] whitespace-pre-line text-center md:hidden ${isHovered || !showSecond
                                      ? "opacity-0 translate-y-full"
                                      : "opacity-100 translate-y-0"
                                      }`}
                                  >
                                    {formatSecondTextMobile(item.secondText || "")}
                                  </div>

                                  {/* SecondText - Desktop */}
                                  <div
                                    className={`absolute text-[#3F3E3D] px-2 z-10 transition-all duration-200 ease-in-out font-medium text-[25px] leading-[35px] whitespace-pre-line text-center hidden md:block ${isHovered || !showSecond
                                      ? "opacity-0 translate-y-full"
                                      : "opacity-100 translate-y-0"
                                      }`}
                                  >
                                    {formatSecondText(item.secondText || "")}
                                  </div>
                                </div>
                              );
                            })()}

                            <div
                              className={`absolute inset-0 transition-transform duration-500 ease-out ${hoveredIndex === index
                                ? "translate-y-0"
                                : "-translate-y-full"
                                }`}
                            >
                              <Image
                                src={getProductImage(item.content || "")}
                                alt={item.content || ""}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 303px"
                              />
                            </div>
                          </a>
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
      <div
        className="max-w-[909px] w-full h-[240px] sm:h-[388px] relative"
        style={{ alignSelf: "flex-end" }}
      >
        {/* Frame products 3 */}
        <div className="absolute bottom-0 w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_products_3.png"
            alt="Frame products 3"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 120px, (max-width: 1024px) 150px, 184px"
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
