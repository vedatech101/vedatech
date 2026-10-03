import type { Transition } from "framer-motion";
export const motionTransition: Transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };
export const cardHover = { y: -5, transition: motionTransition };
export const iconHover = { x: 4, y: -3, transition: motionTransition };
