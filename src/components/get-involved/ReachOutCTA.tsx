"use client";

import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalContext";

export function ReachOutCTA() {
  const { open } = useContactModal();

  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-clay-900/5 sm:p-10">
      <h3 className="font-display text-2xl text-clay-900">Reach Out</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-clay-700">
        Whether you want to serve, share a prayer request, or just say hello — we&rsquo;d love to
        hear from you.
      </p>
      <div className="mt-6">
        <Button onClick={open}>Send Us a Message</Button>
      </div>
    </div>
  );
}
