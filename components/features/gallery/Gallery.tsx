// components/features/gallery/Gallery.tsx
"use client";

import { GalleryItem } from "@/sanity/schema/project";
import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  items: GalleryItem[];
  className?: string;
}

export default function Gallery({ items, className = "" }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const getCaption = (item: GalleryItem): string => {
    return item.caption || "";
  };

  const renderMedia = (item: GalleryItem, isModal = false) => {
    const baseClasses =
      "w-full h-full object-cover transition-all duration-300";
    const modalClasses = isModal
      ? "max-w-4xl max-h-[80vh]"
      : "hover:scale-105 cursor-pointer";

    // Handle Image items
    if (item._type === "Image") {
      console.log("item", item);
      console.log(item._type);

      const imageUrl = item.image?.asset?.url;
      if (!imageUrl) return null;

      return (
        <div
          className={`relative ${isModal ? "w-full h-full" : "aspect-square"}`}
        >
          <Image
            src={imageUrl}
            alt={item.caption ?? ""}
            fill
            className={`${baseClasses} ${modalClasses}`}
            sizes={isModal ? "90vw" : "(max-width: 768px) 50vw, 33vw"}
          />
        </div>
      );
    }

    // Handle video items
    console.log(item);
    if (item._type === "videoFile" && item.asset?.url) {
      if (isModal) {
        return (
          <div className="w-full h-full">
            <video
              src={item.asset.url}
              controls
              autoPlay
              className={`${baseClasses} ${modalClasses}`}
            />
          </div>
        );
      }

      return (
        <div
          className={`relative ${isModal ? "w-full h-full" : "aspect-square"} bg-black`}
        >
          <video
            src={item.asset.url}
            className={`${baseClasses} ${modalClasses}`}
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-6 h-6 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      >
        {items.map((item) => (
          <div
            key={item._key}
            className="group relative overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 hover:shadow-lg"
            onClick={() => handleItemClick(item)}
          >
            {renderMedia(item)}

            {getCaption(item) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium truncate">
                  {getCaption(item)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="bg-white rounded-lg overflow-hidden">
              {renderMedia(selectedItem, true)}

              {getCaption(selectedItem) && (
                <div className="p-4 bg-white">
                  <p className="text-gray-800 text-lg">
                    {getCaption(selectedItem)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
