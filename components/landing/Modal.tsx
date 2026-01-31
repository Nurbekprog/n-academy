"use client";

import React from "react";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const animateOpen = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.style.transition = "opacity 0.3s ease-out";
      overlayRef.current.style.opacity = "1";
    }

    if (modalRef.current) {
      modalRef.current.style.transition =
        "opacity 0.4s ease-out, transform 0.4s ease-out";
      modalRef.current.style.opacity = "1";
      modalRef.current.style.transform = "scale(1) translateY(0)";
    }
  }, []);

  const animateClose = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.style.transition =
        "opacity 0.25s ease-in, transform 0.25s ease-in";
      modalRef.current.style.opacity = "0";
      modalRef.current.style.transform = "scale(0.95) translateY(20px)";
    }

    if (overlayRef.current) {
      overlayRef.current.style.transition = "opacity 0.25s ease-in";
      overlayRef.current.style.opacity = "0";
    }

    setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      animateOpen();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, animateOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        animateClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, animateClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 modal-overlay opacity-0"
        onClick={animateClose}
        onKeyDown={(e) => e.key === "Enter" && animateClose()}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-2xl max-h-[85vh] overflow-auto",
          "bg-white rounded-3xl shadow-2xl",
          "opacity-0",
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/95 backdrop-blur-sm border-b border-border">
          <h3 className="text-xl font-semibold text-foreground">
            {title || "Details"}
          </h3>
          <button
            type="button"
            onClick={animateClose}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
