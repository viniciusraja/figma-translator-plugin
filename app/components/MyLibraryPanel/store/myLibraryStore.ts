import create, { StateCreator } from "zustand";

type MyLibraryStoreItem = { original: string; translation: string };
export type MyLibraryStore = MyLibraryStoreItem[];

export interface MyLibraryState {
  myLibrary: MyLibraryStore;
  setMyLibrary: (myLibrary: MyLibraryStore) => void;
}

export const createSubscriptionStatusTabSlice: StateCreator<MyLibraryState> = (
  set
) => ({
  myLibrary: [],
  setMyLibrary: (myLibrary: MyLibraryStore) => set({ myLibrary }),
});

const useMyLibraryStore = create<MyLibraryState>()((...a) => ({
  ...createSubscriptionStatusTabSlice(...a),
}));

export default useMyLibraryStore;
