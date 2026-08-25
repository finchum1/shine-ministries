"use client";

import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalContext";

// Lets visitors reach out about booking the founder for speaking events —
// routes through the same contact modal used elsewhere on the site.
export function BookMeCTA() {
  const { open } = useContactModal();

  return (
    <Button onClick={() => open({ mode: "booking", topic: "counseling" })}>Book Me</Button>
  );
}
