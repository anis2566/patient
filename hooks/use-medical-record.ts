import { create } from "zustand";

interface MedicalRecordState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useMedicalRecord = create<MedicalRecordState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id: string) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
