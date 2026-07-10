"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, Bed, Eye, Calendar } from "lucide-react";
import { roomData, roomCategories, type RoomCategory } from "@/app/rooms/content";
import { getPdpByCategory } from "@/app/rooms/[slug]/pdp-content";

interface Props {
  category: RoomCategory | null;
  onClose: () => void;
  onBookRoom: (roomNo: string) => void;
}

export function RoomSelectorModal({ category, onClose, onBookRoom }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (category) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [category]);

  // Close on backdrop click
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  const catData = category ? roomCategories.find((c) => c.id === category) : null;
  const rooms = category
    ? roomData.filter((r) => catData?.rooms.includes(r.no))
    : [];
  const pdp = category ? getPdpByCategory(category) : null;

  return (
    <dialog
      ref={dialogRef}
      id="room-selector-modal"
      onClick={handleDialogClick}
      onClose={onClose}
      className="room-dialog m-auto w-[90%] max-w-[560px] rounded-[28px] border-0 p-0 shadow-[0_40px_120px_-20px_rgba(20,16,10,0.45)] outline-none backdrop:bg-[rgba(20,16,10,0.6)] backdrop:backdrop-blur-sm"
      style={{ height: "min(88vh, 700px)" }}
    >
      <div className="flex flex-col bg-cream" style={{ height: "100%" }}>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
              Select Your Room
            </div>
            <h2 className="mt-0.5 font-display text-[22px] font-semibold leading-tight">
              {catData?.title}
            </h2>
          </div>
          <button
            id="close-room-selector"
            onClick={onClose}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line bg-panel text-ink-soft transition-colors hover:bg-ink hover:text-white"
            aria-label="Close"
          >
            <X className="w-[13px] h-[13px]" />
          </button>
        </div>

        {/* Room list */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 grid gap-4">
          {rooms.map((room) => {
            const displayPrice = Math.round(room.base24 * 0.85);
            return (
              <div
                key={room.no}
                className="flex gap-4 rounded-[18px] border border-line bg-panel p-4 transition-shadow hover:shadow-[0_4px_20px_-8px_rgba(20,16,10,0.18)]"
              >
                {/* Room image */}
                <div className="relative h-[80px] w-[100px] flex-none overflow-hidden rounded-[12px]">
                  <Image
                    src={room.image}
                    alt={`Room ${room.no}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                  <div className="img-warm" />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-[17px] font-semibold">
                        Room {room.no}
                      </span>
                      <span className="text-[11px] font-medium text-muted-2 truncate">
                        {room.type}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-[12px] font-medium text-muted-2">
                      <span className="flex items-center gap-1">
                        <Bed className="w-[10px] h-[10px] text-gold-deep" />
                        Up to {room.max} guests
                      </span>
                      <span className="text-gold-deep font-semibold">
                        ₹{displayPrice.toLocaleString()}/night
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    {pdp && (
                      <Link
                        id={`view-room-${room.no}`}
                        href={`/rooms/${pdp.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 text-[12px] font-semibold text-ink-soft no-underline transition-colors hover:border-ink hover:text-ink"
                        aria-label={`View ${pdp.title} details`}
                      >
                        <Eye className="w-[10px] h-[10px]" />
                        View
                      </Link>
                    )}
                    <button
                      id={`book-room-${room.no}`}
                      onClick={() => {
                        onBookRoom(room.no);
                        onClose();
                      }}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-[12px] font-semibold text-white transition-transform hover:scale-[1.02]"
                    >
                      <Calendar className="w-[10px] h-[10px]" />
                      Book This Room
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="border-t border-line px-6 py-3 text-center text-[12px] font-medium text-faint">
          Prices shown are indicative · 5% GST applicable · Flexible 3h / 6h / 12h / 24h slots
        </div>
      </div>
    </dialog>
  );
}
