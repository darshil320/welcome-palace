"use client";

import Image from "next/image";
import { useState } from "react";
import { Bed, Calendar } from "lucide-react";
import { roomData, type RoomCategory } from "@/app/rooms/content";
import { BookingModal, type EnquiryItem } from "@/app/rooms/BookingModal";
import { EnquiryCartPanel } from "@/app/rooms/EnquiryCart";

interface Props {
  category: RoomCategory;
  roomNos: string[];
}

/** Room picker + booking modal + enquiry cart for a category PDP. */
export function PdpBooking({ category, roomNos }: Props) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<EnquiryItem[]>([]);

  const rooms = roomData.filter((r) => roomNos.includes(r.no));

  return (
    <>
      <div id={`pdp-rooms-${category.toLowerCase()}`} className="grid gap-4">
        {rooms.map((room) => {
          const displayPrice = Math.round(room.base24 * 0.85);
          return (
            <div
              key={room.no}
              className="flex gap-4 rounded-[18px] border border-line bg-white p-4 transition-shadow hover:shadow-[0_4px_20px_-8px_rgba(20,16,10,0.18)]"
            >
              <div className="relative h-[76px] w-[96px] flex-none overflow-hidden rounded-[12px]">
                <Image
                  src={room.image}
                  alt={`Room ${room.no}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
                <div className="img-warm" />
              </div>

              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[16px] font-semibold">
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

                <button
                  id={`pdp-book-room-${room.no}`}
                  onClick={() => setSelectedRoom(room.no)}
                  className="mt-3 flex w-fit items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-[12px] font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <Calendar className="w-[10px] h-[10px]" />
                  Book This Room
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <BookingModal
        roomNo={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onAddToCart={(item) => {
          setCartItems((prev) => [...prev, item]);
          setCartOpen(true);
        }}
      />

      <EnquiryCartPanel
        items={cartItems}
        isOpen={cartOpen}
        onOpen={() => setCartOpen(true)}
        onClose={() => setCartOpen(false)}
        onRemove={(id) => setCartItems((prev) => prev.filter((i) => i.id !== id))}
      />
    </>
  );
}
