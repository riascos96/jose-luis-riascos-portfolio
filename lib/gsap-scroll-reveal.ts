import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type DownwardRevealOptions = {
  target: gsap.TweenTarget;
  trigger?: Element | string | null;
  start: string;
  resetStart?: string;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

export function createDownwardReveal({
  target,
  trigger,
  start,
  resetStart = "top bottom",
  from,
  to,
}: DownwardRevealOptions) {
  const revealTrigger = (trigger ?? target) as unknown as gsap.DOMTarget;
  const tween = gsap.fromTo(
    target,
    from,
    {
      ...to,
      paused: true,
      immediateRender: true,
      overwrite: "auto",
    }
  );

  ScrollTrigger.create({
    trigger: revealTrigger,
    start,
    onEnter: () => tween.restart(),
  });

  ScrollTrigger.create({
    trigger: revealTrigger,
    start: resetStart,
    onLeaveBack: () => {
      tween.pause(0);
      gsap.set(target, from);
    },
  });

  return tween;
}
