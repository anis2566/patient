"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => router.back()}
      className="flex items-center gap-2"
    >
      <Undo2 className="h-4 w-4" />
      Back
    </Button>
  );
};
