import React, { useEffect, useState } from "react";
import Sidebar from "../sidebarMenu/sidebar";
import BottomNavigationMobile from "./bottomNavigation";

const ConditionalSidebar = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  // Function to check if the screen size is below a certain threshold (e.g., 900px)

  useEffect(() => {
    // Function to check if the screen size is below a certain threshold (e.g., 900px)
    const isMobileScreen = () => window.innerWidth <= 900;

    // Initial check on component mount
    setIsMobile(isMobileScreen());

    // Event listener to update isMobile when the window is resized
    const handleResize = () => {
      setIsMobile(isMobileScreen());
    };

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <BottomNavigationMobile>{children}</BottomNavigationMobile>
  ) : (
    <Sidebar>{children}</Sidebar>
  );
};

export default ConditionalSidebar;
