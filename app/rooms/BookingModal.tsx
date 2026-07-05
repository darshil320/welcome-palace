"use client";

import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import {
  roomData,
  calculateRoomPrice,
  getNumberOfNights,
  type StaySlot,
  slotLabels,
} from "@/app/rooms/content";
import { TextField, SelectField } from "@/components/form/fields";

interface Props {
  roomNo: string | null;
  onClose: () => void;
  onAddToCart: (item: EnquiryItem) => void;
}

export interface EnquiryItem {
  id: string;
  roomNo: string;
  roomType: string;
  slot: StaySlot;
  checkIn: string;
  checkOut: string;
  checkInTime?: string;
  guests: number;
  guestName: string;
  guestPhone: string;
  city: string;
  base: number;
  gst: number;
  total: number;
}

const todayIso = () => new Date().toISOString().split("T")[0];

function autoCheckoutLabel(checkInTime: string, slot: StaySlot): string {
  if (slot === "24") return "";
  const [h, m] = checkInTime.split(":").map(Number);
  const totalH = h + parseInt(slot);
  const period = totalH >= 12 ? "PM" : "AM";
  const displayH = totalH % 12 || 12;
  return `${displayH}:${String(m).padStart(2, "0")} ${period}`;
}

export function BookingModal({ roomNo, onClose, onAddToCart }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [slot, setSlot] = useState<StaySlot>("24");
  const [checkIn, setCheckIn] = useState(todayIso());
  const [checkOut, setCheckOut] = useState(todayIso());
  const [checkInTime, setCheckInTime] = useState("14:00");
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [city, setCity] = useState("");

  const room = roomNo ? roomData.find((r) => r.no === roomNo) : null;

  // Open/close dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (roomNo) {
      dialog.showModal();
      // Reset form
      setSlot("24");
      setCheckIn(todayIso());
      setCheckOut(todayIso());
      setCheckInTime("14:00");
      setGuests(2);
      setGuestName("");
      setGuestPhone("");
      setCity("");
    } else {
      dialog.close();
    }
  }, [roomNo]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!room) {
    return <dialog ref={dialogRef} className="room-dialog" />;
  }

  const pricing = calculateRoomPrice(room, slot, guests, checkIn, checkOut);
  const nights = slot === "24" ? getNumberOfNights(checkIn, checkOut) : 1;
  const autoOut = slot !== "24" ? autoCheckoutLabel(checkInTime, slot) : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!room) return;
    if (!guestName.trim()) { alert("Please enter your name."); return; }
    if (!guestPhone.trim() || guestPhone.trim().length < 10) { alert("Please enter a valid 10-digit phone number."); return; }

    const item: EnquiryItem = {
      id: `${room.no}-${Date.now()}`,
      roomNo: room.no,
      roomType: room.type,
      slot,
      checkIn,
      checkOut: slot === "24" ? checkOut : checkIn,
      checkInTime: slot !== "24" ? checkInTime : undefined,
      guests,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      city: city.trim(),
      ...pricing,
    };
    onAddToCart(item);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      id="booking-modal"
      onClick={handleBackdropClick}
      onClose={onClose}
      className="room-dialog m-auto w-[92%] max-w-[640px] rounded-[28px] border-0 p-0 shadow-[0_40px_120px_-20px_rgba(20,16,10,0.5)] outline-none backdrop:bg-[rgba(20,16,10,0.6)] backdrop:backdrop-blur-sm"
      style={{ height: "min(92vh, 820px)" }}
    >
      <div className="flex flex-col bg-cream" style={{ height: "100%" }}>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 bg-white">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
              Room {room.no}
            </div>
            <h2 className="mt-0.5 font-display text-[20px] font-semibold leading-tight">
              {room.type}
            </h2>
          </div>
          <button
            id="close-booking-modal"
            onClick={onClose}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line bg-panel text-ink-soft transition-colors hover:bg-ink hover:text-white"
            aria-label="Close booking form"
          >
            <FaTimes className="text-[13px]" />
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 grid gap-5">
          {/* Stay Duration */}
          <div className="rounded-[16px] border-2 border-gold/40 bg-gold-soft/30 p-4">
            <div className="text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase mb-3">
              Stay Duration
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(["3", "6", "12", "24"] as StaySlot[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  id={`slot-${s}hr`}
                  onClick={() => setSlot(s)}
                  className={`rounded-[10px] py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                    slot === s
                      ? "bg-ink text-white shadow-sm"
                      : "border border-line bg-white text-ink-soft hover:border-ink-soft"
                  }`}
                >
                  {s}h
                </button>
              ))}
            </div>
            <div className="mt-2 text-center text-[12px] font-medium text-muted-2">
              {slotLabels[slot]}
            </div>
          </div>

          {/* Date / Time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Check-in Date"
              required
              type="date"
              id="booking-checkin"
              name="checkIn"
              min={todayIso()}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut < e.target.value) setCheckOut(e.target.value);
              }}
            />
            {slot === "24" ? (
              <TextField
                label="Check-out Date"
                required
                type="date"
                id="booking-checkout"
                name="checkOut"
                min={checkIn}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            ) : (
              <div>
                <TextField
                  label="Check-in Time"
                  required
                  type="time"
                  id="booking-checkin-time"
                  name="checkInTime"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                />
                {autoOut && (
                  <div className="mt-1.5 rounded-lg bg-gold-soft/50 px-3 py-1.5 text-[12px] font-medium text-gold-deep">
                    Auto check-out: {autoOut}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Guest count */}
          <SelectField
            label="Number of Guests"
            id="booking-guests"
            name="guests"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          >
            {Array.from({ length: room.max }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} Guest{n > 1 ? "s" : ""}
              </option>
            ))}
          </SelectField>

          {/* Guest info */}
          <TextField
            label="Full Name"
            required
            id="booking-name"
            name="guestName"
            placeholder="Your full name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Phone Number"
              required
              type="tel"
              id="booking-phone"
              name="guestPhone"
              placeholder="+91 98765 43210"
              maxLength={10}
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
            />
            <TextField
              label="City"
              id="booking-city"
              name="city"
              placeholder="Surat"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Price breakdown */}
          <div className="rounded-[16px] bg-panel border border-line p-5">
            <div className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase mb-4">
              Price Summary · {nights} night{nights > 1 ? "s" : ""}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[14px]">
                <span className="text-ink-soft font-medium">Base Price</span>
                <span className="font-semibold">₹{pricing.base.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-ink-soft font-medium">GST (5%)</span>
                <span className="font-semibold">₹{pricing.gst.toLocaleString()}</span>
              </div>
              <div className="mt-3 border-t border-line-strong pt-3 flex justify-between">
                <span className="font-display text-[16px] font-semibold">Total</span>
                <span className="font-display text-[22px] font-semibold text-gold-deep">
                  ₹{pricing.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="add-to-enquiry-cart"
            className="mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[15px] font-semibold text-white transition-transform duration-[220ms] hover:scale-[1.015]"
          >
            <FaCheck className="text-[12px]" />
            Add to Enquiry
          </button>

          <p className="text-center text-[12px] font-medium text-faint leading-[1.5]">
            This sends your room details to our team via WhatsApp for confirmation.
          </p>
        </form>
      </div>
    </dialog>
  );
}
