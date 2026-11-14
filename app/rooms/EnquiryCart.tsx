"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Trash2, X, MessageCircle, ArrowRight } from "lucide-react";
import { type EnquiryItem } from "@/app/rooms/BookingModal";
import { slotLabels, type StaySlot } from "@/app/rooms/content";
import { contact } from "@/lib/content";
import { MOTION } from "@/lib/motion";
import { SentNotice } from "@/components/form/SentNotice";

interface Props {
  items: EnquiryItem[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onRemove: (id: string) => void;
  onRestore: (item: EnquiryItem, index: number) => void;
}

function buildWhatsAppMessage(items: EnquiryItem[]): string {
  const total = items.reduce((sum, i) => sum + i.total, 0);
  let msg = "Hi Welcome Palace! Here is my room booking enquiry:\n\n";
  items.forEach((item, idx) => {
    msg += `${idx + 1}. Room ${item.roomNo} — ${item.roomType}\n`;
    msg += `   Stay: ${slotLabels[item.slot]}\n`;
    if (item.slot === "24") {
      msg += `   Check-in: ${item.checkIn} → Check-out: ${item.checkOut}\n`;
    } else {
      msg += `   Date: ${item.checkIn}, Time: ${item.checkInTime}\n`;
    }
    msg += `   Guests: ${item.guests}\n`;
    msg += `   Name: ${item.guestName} | Phone: ${item.guestPhone}`;
    if (item.city) msg += ` | City: ${item.city}`;
    msg += `\n   Total: ₹${item.total.toLocaleString()} (incl. 5% GST)\n\n`;
  });
  msg += `Grand Total: ₹${total.toLocaleString()}\nPlease confirm availability.`;
  return msg;
}

export function EnquiryCartPanel({ items, isOpen, onOpen, onClose, onRemove, onRestore }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const undoButtonRef = useRef<HTMLButtonElement>(null);
  const undoTimer = useRef<number | undefined>(undefined);
  const [removed, setRemoved] = useState<{ item: EnquiryItem; index: number } | null>(null);
  const [sent, setSent] = useState(false);

  // A fresh open starts without the previous "sent" line.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setSent(false);
  }

  useEffect(() => () => window.clearTimeout(undoTimer.current), []);

  // Focus follows the removal to the Undo button (the row it was on is gone).
  useEffect(() => {
    if (removed) undoButtonRef.current?.focus();
  }, [removed]);

  // Recover instead of confirm: the item leaves at once, Undo stays for 5s.
  function removeItem(item: EnquiryItem, index: number) {
    onRemove(item.id);
    setRemoved({ item, index });
    window.clearTimeout(undoTimer.current);
    undoTimer.current = window.setTimeout(() => setRemoved(null), MOTION.undoMs);
  }

  function undoRemove() {
    if (!removed) return;
    window.clearTimeout(undoTimer.current);
    onRestore(removed.item, removed.index);
    setRemoved(null);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) dialog.showModal();
    else dialog.close();
  }, [isOpen]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  const total = items.reduce((sum, i) => sum + i.total, 0);

  function checkout() {
    if (items.length === 0) return;
    const msg = buildWhatsAppMessage(items);
    window.open(
      `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSent(true);
  }

  return (
    <>
      {/* Floating cart button */}
      <button
        id="open-enquiry-cart"
        onClick={onOpen}
        aria-label={`Open enquiry cart (${items.length} items)`}
        className={`press fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 rounded-full shadow-[0_8px_30px_-8px_rgba(20,16,10,0.45)] ${
          items.length > 0
            ? "bg-ink px-5 py-3.5 text-white"
            : "bg-panel border border-line px-4 py-3 text-ink-soft"
        }`}
      >
        <ShoppingCart className="w-[15px] h-[15px]" />
        <span className="text-[14px] font-semibold">
          {items.length > 0 ? `Enquiry (${items.length})` : "Cart"}
        </span>
        {items.length > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
            {items.length}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      <dialog
        ref={dialogRef}
        id="enquiry-cart-modal"
        onClick={handleBackdrop}
        onClose={onClose}
        className="room-dialog m-auto w-[92%] max-w-[580px] rounded-[28px] border-0 p-0 shadow-[0_40px_120px_-20px_rgba(20,16,10,0.5)] outline-none backdrop:bg-[rgba(20,16,10,0.55)] backdrop:backdrop-blur-sm"
        style={{ height: "min(90vh, 760px)" }}
      >
        <div className="flex flex-col bg-cream" style={{ height: "100%" }}>
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 bg-white">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
                Booking Enquiry
              </div>
              <h2 className="mt-0.5 font-display text-[20px] font-semibold leading-tight">
                Your Cart · {items.length} item{items.length !== 1 ? "s" : ""}
              </h2>
            </div>
            <button
              id="close-enquiry-cart"
              onClick={onClose}
              className="press hit-area flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line bg-panel text-ink-soft hover:bg-ink hover:text-white"
              aria-label="Close cart"
            >
              <X className="w-[13px] h-[13px]" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            {removed ? (
              <div
                role="status"
                className="flex items-center justify-between gap-3 rounded-[14px] bg-ink px-4 py-3 text-[13.5px] font-medium text-white transition-[opacity,translate] duration-(--dur-modal-in) ease-(--ease-enter) starting:-translate-y-2 starting:opacity-0"
              >
                <span>Room {removed.item.roomNo} removed from your enquiry.</span>
                <button
                  ref={undoButtonRef}
                  type="button"
                  onClick={undoRemove}
                  className="press hit-area rounded-full px-2 py-1 font-semibold text-gold underline underline-offset-2"
                >
                  Undo
                </button>
              </div>
            ) : null}
            {items.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingCart className="mx-auto mb-4 w-[36px] h-[36px] text-faint" />
                <p className="text-[15px] font-medium text-muted-2">
                  Your enquiry cart is empty.
                </p>
                <p className="mt-1 text-[13px] text-faint">
                  Select a room and add it to your enquiry.
                </p>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-[16px] border border-line bg-panel p-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-[15px]">
                          Room {item.roomNo}
                          <span className="ml-2 text-[12px] font-medium text-muted-2">
                            {item.roomType}
                          </span>
                        </div>
                        <div className="mt-1 text-[12.5px] font-medium text-ink-soft">
                          {slotLabels[item.slot as StaySlot]}
                          {item.slot === "24"
                            ? ` · ${item.checkIn} → ${item.checkOut}`
                            : ` · ${item.checkIn} @ ${item.checkInTime}`}
                        </div>
                        <div className="mt-0.5 text-[12px] text-muted-2">
                          {item.guests} guest{item.guests > 1 ? "s" : ""} ·{" "}
                          {item.guestName}
                        </div>
                      </div>
                      <button
                        id={`remove-cart-${item.id}`}
                        onClick={() => removeItem(item, index)}
                        className="press hit-area flex h-7 w-7 flex-none items-center justify-center rounded-full border border-line text-muted-2 hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remove room ${item.roomNo} from cart`}
                      >
                        <Trash2 className="w-[10px] h-[10px]" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-[18px] font-semibold text-gold-deep">
                        ₹{item.total.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-faint">incl. GST</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-line bg-white px-6 py-5">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-[14px] font-medium text-ink-soft">
                  Grand Total
                </span>
                <span className="font-display text-[24px] font-semibold text-gold-deep">
                  ₹{total.toLocaleString()}
                </span>
              </div>
              <button
                id="proceed-to-whatsapp"
                onClick={checkout}
                className="press-surface flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_-4px_rgba(37,211,102,0.4)]"
              >
                <MessageCircle className="w-[17px] h-[17px]" />
                Send Enquiry via WhatsApp
                <ArrowRight className="w-[12px] h-[12px]" />
              </button>
              <div className="mt-3">
                <SentNotice show={sent} />
              </div>
              <p className="mt-3 text-center text-[11.5px] font-medium text-faint">
                Our team responds within 2 hours · No payment required now
              </p>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
