
  

import React, { useRef } from "react";
import type { ReactElement, ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,

}: CopyProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLElement[]>([]);

  const splitRef = useRef<any[]>([]);
  const lines = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      elementRef.current = [];
      splitRef.current = [];
      lines.current = [];

      let elements: HTMLElement[] = [];

      if ((container as HTMLElement).hasAttribute("data-copy-wrapper")) {
        elements = Array.from(container.children) as HTMLElement[];
      } else {
        elements = [container as HTMLElement];
      }

      elements.forEach((element) => {
        elementRef.current.push(element);

        const split = new SplitText(element, {
          type: "lines",
          linesClass: "line++",
          mask: 'lines'
        });


        splitRef.current.push(split);

        const textIndent = window.getComputedStyle(element).textIndent;

        if (textIndent === "0px" && split.lines.length > 0) {
          (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
          element.style.textIndent = "0";
        }

        lines.current.push(...(split.lines as HTMLElement[]));
      });

      gsap.set(lines.current, { y: "100%" });

      const animationProps = {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
      }

      return () => {
        splitRef.current.forEach((split) => {
          if (split && typeof split.revert === "function") {
            split.revert();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

if (
  React.Children.count(children) === 1 &&
  React.isValidElement(children)
) {
  return React.cloneElement(children as ReactElement<any>, {
    ref: containerRef,
  });
}


  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
