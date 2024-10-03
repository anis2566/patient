import { create } from "zustand";

interface GenericState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useGeneric = create<GenericState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

interface DeleteGenericState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteGeneric = create<DeleteGenericState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id: string) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
