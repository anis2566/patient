import { create } from "zustand";

interface ManufacturerState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useManufacturer = create<ManufacturerState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

interface DeleteManufacturerState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteManufacturer = create<DeleteManufacturerState>()(
  (set) => ({
    open: false,
    id: "",
    onOpen: (id: string) => set({ open: true, id }),
    onClose: () => set({ open: false, id: "" }),
  }),
);
