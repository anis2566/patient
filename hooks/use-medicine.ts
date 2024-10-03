import { create } from "zustand";

interface DeleteMedicineState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteMedicine = create<DeleteMedicineState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id: string) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
