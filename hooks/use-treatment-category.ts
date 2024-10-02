import { create } from "zustand";

interface TreatmentCategoryState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTreatmentCategory = create<TreatmentCategoryState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

interface DeleteTreatmentCategoryState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteTreatmentCategory =
  create<DeleteTreatmentCategoryState>()((set) => ({
    open: false,
    id: "",
    onOpen: (id: string) => set({ open: true, id }),
    onClose: () => set({ open: false, id: "" }),
  }));
