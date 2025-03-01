import { create } from "zustand";

interface ApplicationState {
  isErrorTriggered: boolean;
  isLoading: boolean;
  actions: {
    setIsErrorTriggered: (value: boolean) => void;
    setIsLoading: (value: boolean) => void;
  };
}

export const useApplicationStateStore = create<ApplicationState>()((set) => ({
  isErrorTriggered: false,
  isLoading: true,
  actions: {
    setIsErrorTriggered: (value) => set({ isErrorTriggered: value }),
    setIsLoading: (value) => set({ isLoading: value }),
  },
}));

export const useIsErrorTriggered = () =>
  useApplicationStateStore((state) => state.isErrorTriggered);
export const useIsLoading = () =>
  useApplicationStateStore((state) => state.isLoading);

export const useApplicationStateStoreActions = () =>
  useApplicationStateStore((state) => state.actions);
