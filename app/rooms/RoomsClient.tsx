"use client";

import { useState } from "react";
import { type RoomCategory } from "@/app/rooms/content";
import { RoomCategorySection } from "@/app/rooms/RoomCategorySection";
import { RoomSelectorModal } from "@/app/rooms/RoomSelectorModal";
import { BookingModal, type EnquiryItem } from "@/app/rooms/BookingModal";
import { EnquiryCartPanel } from "@/app/rooms/EnquiryCart";

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

  return (
    <>
      <RoomCategorySection onSelectCategory={setSelectedCategory} />

      <RoomSelectorModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onBookRoom={(roomNo) => {
          setSelectedRoom(roomNo);
        }}
      />

      <BookingModal
        roomNo={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onAddToCart={(item) => {
          handleAddToCart(item);
          setCartOpen(true);
        }}
      />

      <EnquiryCartPanel
        items={cartItems}
        isOpen={cartOpen}
        onOpen={() => setCartOpen(true)}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
      />
    </>
  );
}
