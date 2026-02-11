"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Cross } from "../icons/Cross";

const productImageMap: Record<string, string> = {
  Fleeky: "Fleeky-Wallpapers",
};

const getProductImage = (productName: string) => {
  const imageName = productImageMap[productName] || productName;
  return `/products/${imageName}.png`;
};

const productLinks: Record<string, string> = {
  "PDF Scanner":
    "https://apps.apple.com/by/app/pdf-scanner-scan-documents/id1561802302",
  Zipper:
    "https://apps.apple.com/us/app/zip-extractor-unzip-unrar/id6443985825",
  "Call Recorder":
    "https://apps.apple.com/us/app/the-voice-recorder-call-%D0%BC%D0%B5%D0%BC%D0%BEs/id6475734022",
  FAX: "https://apps.apple.com/us/app/recieve-fax-send-receive/id1627433298",
  "AI Calorie Counter":
    "https://apps.apple.com/us/app/ai-calorie-counter-meal-plan/id6749527794",
  Sense:
    "https://apps.apple.com/us/app/guided-meditation-calm-rabbit/id1584776535",
  NookAI:
    "https://apps.apple.com/us/app/ai-room-planner-nookai-design/id6752864212",
  Fleeky: "https://apps.apple.com/us/app/fleeky-wallpapers-theme/id6478114730",
  VEON: "https://apps.apple.com/us/app/ai-cosmetic-scanner-v%C3%A9on/id6742449597",
  "Plant ID & Care":
    "https://apps.apple.com/us/app/plant-id-care-planthy-ai/id6504182856",
};

const productSecondText: Record<string, string> = {
  "PDF Scanner": "6K+ Users 300K+ Downloads",
  Zipper: "1K+ Users 29K+ Downloads",
  "Call Recorder": "500+ Users 6K+ Downloads",
  FAX: "700+ Users 18K+ Downloads",
  Sense: "1K+ Users 21K+ Downloads",
  "AI Calorie Counter": "120K+ Users 600K+ Downloads",
  NookAI: "13K+ Users 100K+ Downloads",
  Fleeky: "60K+ Users 700K+ Downloads",
  VEON: "500+ Users 3K+ Downloads",
  "Plant ID & Care": "1K+ Users 10K+ Downloads",
};

const formatSecondText = (text: string) => text.replace(/Users\s+/g, "Users\n");

const formatSecondTextMobile = (text: string) =>
  text
    .replace(/\s+Users/g, " Users")
    .replace(/Users\s+/g, "Users\n")
    .replace(/\s+Downloads/g, "\nDownloads");

const productGroups: Record<string, number> = {
  "PDF Scanner": 1,
  FAX: 1,
  "AI Calorie Counter": 1,
  VEON: 1,
  "Call Recorder": 2,
  Zipper: 2,
  NookAI: 2,
  Sense: 3,
  Fleeky: 3,
  "Plant ID & Care": 3,
};

const textVariants: Variants = {
  initial: {
    y: 40,
    opacity: 0,
    filter: "blur(6px)",
    scale: 0.985,
  },
  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    y: -28,
    opacity: 0,
    filter: "blur(4px)",
    scale: 0.99,
    transition: {
      duration: 0.45,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function Products() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isHoveringProduct, setIsHoveringProduct] = useState(false);
  const [shouldShowLink, setShouldShowLink] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const linkTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentGroup((prev) => (prev === 3 ? 1 : prev + 1));
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    if (!isDesktop) return;

    setShouldShowLink(false);

    if (linkTimeout.current) {
      clearTimeout(linkTimeout.current);
      linkTimeout.current = null;
    }

    hoverTimeout.current = setTimeout(() => {
      setHoveredIndex(index);
      setIsHoveringProduct(true);

      linkTimeout.current = setTimeout(() => {
        setShouldShowLink(true);
      }, 150);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;

    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }

    if (linkTimeout.current) {
      clearTimeout(linkTimeout.current);
      linkTimeout.current = null;
    }

    setHoveredIndex(null);
    setIsHoveringProduct(false);
    setShouldShowLink(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const tableRows = [
    [
      { type: "text", content: "PDF Scanner" },
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
      { type: "text", content: "NookAI" },
      { type: "empty" },
      { type: "frame", frameImage: "/frames/frame_products_2.png" },
    ],
    [
      { type: "empty" },
      { type: "text", content: "Fleeky" },
      { type: "text", content: "VEON" },
    ],
    [
      { type: "text", content: "Plant ID & Care" },
      { type: "empty" },
      { type: "empty" },
    ],
  ] as const;

  return (
    <div className="min-h-screen flex flex-col justify-end px-4 py-4 sm:px-16 sm:py-16 pb-50 relative">
      {isDesktop && isHoveringProduct && shouldShowLink && cursorPosition && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="hidden md:block fixed pointer-events-none z-50"
          style={{
            left: cursorPosition.x + 15,
            top: cursorPosition.y - 40,
            width: 155,
            height: 30,
            background: "#FAFAFA",
            borderRadius: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 25,
            fontWeight: 500,
            color: "#9F9B96",
          }}
        >
          https://...
        </motion.div>
      )}
      <div className="max-w-[909px] flex" style={{ alignSelf: "flex-end" }}>
        <table className="w-full table-fixed border-collapse">
          <tbody>
            {tableRows.map((row, r) => (
              <tr key={r}>
                {row.map((item, c) => {
                  const index = r * 3 + c;
                  const isHovering = hoveredIndex === index;

                  if (item.type !== "text") {
                    return (
                      <td key={c}>
                        <div className="w-full max-w-[303px] aspect-square mx-auto relative overflow-hidden flex items-center justify-center">
                          {item.type === "frame" && (
                            <Image
                              draggable={false}
                              src={item.frameImage!}
                              alt=""
                              width={164}
                              height={164}
                              className="w-[84px] h-[84px] md:w-[184px] md:h-[184px] max-w-[60%] max-h-[60%]"
                            />
                          )}
                        </div>
                      </td>
                    );
                  }

                  const productGroup = productGroups[item.content];
                  const showSecond = productGroup === currentGroup;

                  const textValue = showSecond
                    ? isDesktop
                      ? formatSecondText(productSecondText[item.content])
                      : formatSecondTextMobile(productSecondText[item.content])
                    : item.content;

                  return (
                    <td key={c} className="border border-[#9F9B96]">
                      <div className="w-full max-w-[303px] aspect-square mx-auto relative overflow-hidden">
                        <a
                          href={productLinks[item.content]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center relative"
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                          onMouseMove={handleMouseMove}
                        >
                          <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={textValue}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute inset-0 flex items-center justify-center text-[#9F9B96] whitespace-pre-line text-center px-2 font-medium md:text-[20px] lg:text-[25px]"
                              >
                                {textValue}
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          <div
                            className={`absolute inset-0 overflow-hidden transition-transform duration-500 ${
                              isHovering
                                ? "translate-y-0"
                                : "-translate-y-[102%]"
                            } `}
                          >
                            <Image
                              draggable={false}
                              src={getProductImage(item.content)}
                              alt={item.content}
                              quality={85}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </a>
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
        <div className="absolute right-1/2 translate-x-1/2 bottom-20 w-[85px] h-[85px] md:w-[150px] md:h-[150px] lg:w-[184px] lg:h-[184px]">
          <Image
            src="/frames/frame_products_3.png"
            alt=""
            fill
            className="object-contain"
          />
          <div className="absolute left-[-30px] md:left-[-45px] lg:left-[-60px] bottom-[-30px] md:bottom-[-40px] lg:bottom-[-50px]">
            <Cross
              color="#3F3E3D"
              className="w-4 h-4 md:w-6 md:h-6 lg:w-auto lg:h-auto"
            />
          </div>
          <div className="absolute right-[-30px] md:right-[-45px] lg:right-[-60px] top-[-30px] md:top-[-40px] lg:top-[-50px]">
            <Cross
              color="#3F3E3D"
              className="w-4 h-4 md:w-6 md:h-6 lg:w-auto lg:h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
