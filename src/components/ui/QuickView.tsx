"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./Button";
import { Product, ProductVariant } from "../../lib/shopify/mock-data";
import { useCartStore } from "../../store/cartStore";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-sm",
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
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 bg-[var(--color-linen)] p-0 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 bg-white/50 backdrop-blur-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface QuickViewProps {
  product: Product;
  trigger?: React.ReactNode;
}

export function QuickView({ product, trigger }: QuickViewProps) {
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant>(product.variants[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, selectedVariant);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Quick View</Button>}
      </DialogTrigger>
      <DialogContent className="grid sm:grid-cols-2 gap-0 border-0">
        <div className="relative aspect-square sm:aspect-auto w-full h-full bg-[var(--color-semolina)]">
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex gap-2 mb-4 flex-wrap">
               {product.tags.map(tag => (
                 <span key={tag} className="text-[10px] uppercase tracking-widest text-[var(--color-terracotta)] font-mono border border-[var(--color-terracotta)]/30 px-2 py-1 rounded-sm">
                   {tag}
                 </span>
               ))}
            </div>
            <DialogPrimitive.Title className="text-3xl font-serif mb-2">{product.title}</DialogPrimitive.Title>
            <DialogPrimitive.Description className="text-[var(--color-espresso)]/80 text-sm mb-6 leading-relaxed">
              {product.description}
            </DialogPrimitive.Description>

            <div className="space-y-4 mb-8">
              <span className="text-xs uppercase tracking-widest font-mono text-black/50">Select Size/Variant</span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={cn(
                      "px-4 py-2 border rounded-md text-sm transition-all",
                      selectedVariant.id === v.id
                        ? "border-[var(--color-espresso)] bg-[var(--color-espresso)] text-[var(--color-linen)]"
                        : "border-[var(--color-espresso)]/20 hover:border-[var(--color-espresso)]/50"
                    )}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-black/10 flex items-center justify-between gap-4">
            <span className="text-xl font-serif">${selectedVariant.price}</span>
            <Button className="flex-1" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
