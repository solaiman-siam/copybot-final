import { Outlet, ScrollRestoration } from "react-router";

import { ReactLenis } from "lenis/react";
function MainLayout() {
  //  useSmoothScroll();
  return (
    <>
      <ReactLenis  root>
        <div className="font-avant bg-[#FEFCFB] ">
          <ScrollRestoration />
          <Outlet />
        </div>
      </ReactLenis>
    </>
  );
}

export default MainLayout;
