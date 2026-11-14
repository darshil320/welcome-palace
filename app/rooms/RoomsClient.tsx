"use client";

import { useState } from "react";
import { type RoomCategory } from "@/app/rooms/content";
import { RoomCategorySection } from "@/app/rooms/RoomCategorySection";
import { RoomSelectorModal } from "@/app/rooms/RoomSelectorModal";
import { BookingModal, type EnquiryItem } from "@/app/rooms/BookingModal";
import { EnquiryCartPanel } from "@/app/rooms/EnquiryCart";
import { afterModalExit } from "@/lib/motion";

export function RoomsClient() {
  const [selectedCategory, setSelectedCategory] = useState<RoomCategory | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<EnquiryItem[]>([]);

  function handleAddToCart(item: EnquiryItem) {
    setCartItems((prev) => [...prev, item]);
  }

  function handleRemoveFromCart(id: string) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  // Undo puts the item back where it was.
  function handleRestoreToCart(item: EnquiryItem, index: number) {
    setCartItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev.slice(0, index), item, ...prev.slice(index)]));
  }

  return (
    <>
      <RoomCategorySection onSelectCategory={setSelectedCategory} />

      <RoomSelectorModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onBookRoom={(roomNo) => {
          // Staging: the room list finishes leaving before the booking form arrives.
          afterModalExit(() => setSelectedRoom(roomNo));
        }}
      />

      <BookingModal
        roomNo={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onAddToCart={(item) => {
          handleAddToCart(item);
          afterModalExit(() => setCartOpen(true));
        }}
      />

      <EnquiryCartPanel
        items={cartItems}
        isOpen={cartOpen}
        onOpen={() => setCartOpen(true)}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onRestore={handleRestoreToCart}
      />
    </>
  );
}
