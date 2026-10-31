import type LocomotiveScroll from "locomotive-scroll";

let instance: LocomotiveScroll | null = null;

export function setLocomotiveScroll(scroll: LocomotiveScroll | null) {
  instance = scroll;
}

export function getLocomotiveScroll() {
  return instance;
}
