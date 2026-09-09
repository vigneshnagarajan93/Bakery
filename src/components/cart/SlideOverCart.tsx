"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { useCartStore } from "../../store/cartStore";

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed right-0 top-0 z-50 h-full w-full max-w-md bg-[var(--color-linen)] p-6 shadow-2xl transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-500 sm:duration-700 border-l border-[var(--color-espresso)]/10 flex flex-col",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;


export function SlideOverCart() {
  const { isOpen, setIsOpen, items, removeItem, updateQuantity, orderNote, setOrderNote, getCheckoutUrl } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

  const hasLocalPickup = items.some(item => item.tags.includes("Local Pickup Only"));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <div className="flex items-center justify-between mb-8">
          <DialogPrimitive.Title className="text-2xl font-serif">Your Order</DialogPrimitive.Title>
          <DialogPrimitive.Close asChild>
            <button className="rounded-full p-2 hover:bg-black/5 transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </DialogPrimitive.Close>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingBag className="h-12 w-12" />
              <p className="font-mono text-sm uppercase tracking-widest">Cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-black/10 bg-[var(--color-semolina)]">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium">
                      <h3 className="font-serif leading-tight pr-4">{item.title}</h3>
                      <p className="ml-4">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-espresso)]/60">{item.variantTitle}</p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-black/20 rounded-md">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-black/5 rounded-l-md"><Minus className="h-3 w-3"/></button>
                        <span className="px-3 font-mono text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-black/5 rounded-r-md"><Plus className="h-3 w-3"/></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} type="button" className="font-medium text-[var(--color-terracotta)] hover:opacity-80 transition-opacity">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/10 pt-6 space-y-6 mt-auto">
            {hasLocalPickup && (
               <div className="bg-[var(--color-semolina)] p-4 rounded-md">
                  <label htmlFor="order-note" className="block text-xs font-mono uppercase tracking-wider mb-2">Pickup Time Preference (Optional)</label>
                  <textarea
                    id="order-note"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="e.g. Wednesday around 2pm"
                    className="w-full bg-transparent border-b border-black/20 focus:border-black outline-none text-sm p-1 resize-none h-10"
                  />
               </div>
            )}

            <div className="flex justify-between text-base font-medium">
              <p className="font-serif text-lg">Subtotal</p>
              <p className="font-serif text-lg">${subtotal.toFixed(2)}</p>
            </div>
            <p className="text-xs text-[var(--color-espresso)]/60">Taxes and shipping calculated at checkout.</p>

            <Button size="lg" className="w-full text-lg h-14" asChild>
               <a href={getCheckoutUrl()}>Checkout</a>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
