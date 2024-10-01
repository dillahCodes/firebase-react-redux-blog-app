import { memo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, ConfigProvider } from "antd";
import { myThemeConfigs } from "../../../theme/antd-theme";
import classNames from "classnames";
import { isBrowser, isMobile } from "react-device-detect";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const ArticleTopicSlider = memo(({ topics = [], onSelect, defaultSeelectedIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(defaultSeelectedIndex); // Tracks the currently selected topic index
  const [isAtEnd, setIsAtEnd] = useState({ leftEnd: true, rightEnd: false }); // Tracks whether the user has scrolled to the ends
  const scrollableContainerRef = useRef(); // Ref to access the scrollable container

  useEffect(() => {
    setCurrentIndex(defaultSeelectedIndex);
  }, [defaultSeelectedIndex]);

  // Listen to scroll events and determine if the user is at the left or right end
  useEffect(() => {
    const handleScroll = () => {
      if (scrollableContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollableContainerRef.current;
        setIsAtEnd({
          leftEnd: scrollLeft === 24, // Check if scrolled to the left end
          rightEnd: scrollLeft + clientWidth >= scrollWidth, // Check if scrolled to the right end
        });
      }
    };

    const scrollableElement = scrollableContainerRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll); // Add scroll listener
      handleScroll(); // Initial check to update UI
    }

    return () => {
      if (scrollableElement) scrollableElement.removeEventListener("scroll", handleScroll); // Cleanup listener on unmount
    };
  }, []);

  // Handle clicking the next arrow to scroll to the right
  const handleNextClick = () => {
    if (scrollableContainerRef.current) scrollableContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };

  // Handle clicking the previous arrow to scroll to the left
  const handlePrevClick = () => {
    if (scrollableContainerRef.current) scrollableContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  // Handle selecting a topic by clicking on it
  const handleClick = (index) => {
    const scrollUnit = isMobile ? 100 : 70; // Adjust scroll units for mobile and desktop
    const sectionElement = scrollableContainerRef.current;
    const scrollAmount = index * scrollUnit; // Calculate scroll amount based on the index
    setCurrentIndex(index); // Update the selected index

    // Trigger callback to external component with the selected index and topic
    if (onSelect) onSelect(index, topics[index]);

    // Scroll smoothly to the selected topic
    if (sectionElement) sectionElement.scroll({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className={classNames("w-full h-fit transition-all duration-300 relative  bg-[#fafff0] p-3 z-[5]")}>
      {/* Right arrow (only visible if not at the right end) */}
      {!isAtEnd.rightEnd && isBrowser && (
        <div className="absolute h-full w-fit p-3 z-10 right-0 top-0 bg-gradient-to-l from-[#fafff0] from-80% to-transparent flex items-center">
          <span className="ml-auto cursor-pointer text-[#58942e] text-xl" onClick={handleNextClick}>
            <MdArrowForwardIos />
          </span>
        </div>
      )}

      {/* Left arrow (only visible if not at the left end) */}
      {!isAtEnd.leftEnd && isBrowser && (
        <div className="absolute h-full w-fit p-3 top-0 z-10 left-0 bg-gradient-to-r from-[#fafff0] from-80% to-transparent flex items-center">
          <span className="mr-auto cursor-pointer text-[#58942e] text-xl" onClick={handlePrevClick}>
            <MdArrowBackIos />
          </span>
        </div>
      )}

      {/* List of topics displayed as buttons */}
      <div
        ref={scrollableContainerRef}
        className={classNames(
          "flex px-2  snap-x h-fit before:w-full before:h-3 snap-mandatory items-center gap-x-4 overflow-x-auto no-scrollbar py-2"
        )}
      >
        {topics?.map((topic, index) => (
          <ConfigProvider wave={{ disabled: true }} key={index}>
            <Button
              type="primary"
              onClick={() => handleClick(index)}
              style={myThemeConfigs.buttonBorderList} // Apply custom styles from theme
              className={classNames(
                "rounded-md relative text-xs snap-start capitalize cursor-pointer font-special-elite p-3 py-2",
                { "bg-transparent hover:text-black shadow-none": index !== currentIndex } // Highlight selected topic
              )}
            >
              {topic}
            </Button>
          </ConfigProvider>
        ))}
      </div>
    </section>
  );
});

ArticleTopicSlider.displayName = "ArticleTopicSlider"; // Set component display name for debugging purposes

export default ArticleTopicSlider;

ArticleTopicSlider.propTypes = {
  topics: PropTypes.array, // List of topics to display
  onSelect: PropTypes.func, // Callback when a topic is selected
  defaultSeelectedIndex: PropTypes.number, // Index of the default selected topic
};
