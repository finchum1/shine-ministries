"use client";

import { Button } from "@/components/ui/Button";
import { useContactModal } from "@/components/contact/ContactModalContext";

export function DonateCTA() {
  const { open } = useContactModal();

  return (
    <Button variant="secondary" onClick={() => open()}>
      Other Ways to Give
    </Button>
  );
}
