const handlePageSwitch = () => {
  setAnimationDirection('left'); // Slide out to the left

  setTimeout(() => {
    setIsPageVisible(false); // Hide the current page
    setCurrentPage(currentPage === 'home' ? 'second' : 'home'); // Switch pages
    setAnimationDirection('right'); // Set slide-in direction for the new page

    setTimeout(() => {
      setIsPageVisible(true); // Show the new page
    }, 50); // Slight delay to ensure smooth transition
  }, 1500); // Matches Slide timeout
};
