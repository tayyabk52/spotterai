"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import { LazyMotion } from "motion/react";
const query = "(prefers-reduced-motion: no-preference)";
const cinematicQuery = `${query} and (min-width: 1024px) and (min-height: 850px)`;
const subscribeQuery = (query: string, callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const subscribeCinematic = (callback: () => void) =>
  subscribeQuery(cinematicQuery, callback);
const serverSnapshot = () => false;
const loadFeatures = () =>
  import("../motion-features").then((module) => module.motionFeatures);
const StoryMotionContext = createContext({
  enabled: false,
  eligible: false,
  heroEligible: false,
  cinematic: false,
  paused: false,
  toggle: () => {},
});
export function useStoryMotion() {
  return useContext(StoryMotionContext);
}
export function StoryMotionProvider({
  children,
  mediaQuery = query,
}: {
  children: React.ReactNode;
  mediaQuery?: string;
}) {
  const subscribe = useCallback(
    (callback: () => void) => subscribeQuery(mediaQuery, callback),
    [mediaQuery],
  );
  const eligible = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(mediaQuery).matches,
    serverSnapshot,
  );
  const cinematic = useSyncExternalStore(
    subscribeCinematic,
    () => window.matchMedia(cinematicQuery).matches,
    serverSnapshot,
  );
  const [paused, setPaused] = useState(false);
  return (
    <StoryMotionContext.Provider
      value={{
        eligible,
        heroEligible: eligible,
        cinematic,
        enabled: eligible && !paused,
        paused,
        toggle: () => setPaused((value) => !value),
      }}
    >
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </StoryMotionContext.Provider>
  );
}
