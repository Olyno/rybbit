import { User } from "better-auth";
import { create } from "zustand";
import { authClient } from "./auth";

export const userStore = create<{
  user: User | null;
  isPending: boolean;
  setSession: (user: User) => void;
  setIsPending: (isPending: boolean) => void;
}>(set => ({
  user: null,
  isPending: true,
  setSession: user => set({ user }),
  setIsPending: isPending => set({ isPending }),
}));

// Browser-only: self-hosted images are built with an empty NEXT_PUBLIC_BACKEND_URL,
// so better-auth fetches the relative "/api/auth/get-session". That resolves fine
// against the page origin in the browser, but Node's fetch requires an absolute URL,
// so running this during SSR/startup rejects with ERR_INVALID_URL. The store's
// initial state is what server renders see; the client hydrates over it.
if (typeof window !== 'undefined') {
  authClient
    .getSession()
    .then(({ data: session }) => {
      userStore.setState({
        user: session?.user,
        isPending: false,
      });
    })
    .catch(() => {
      userStore.setState({ isPending: false });
    });
}
