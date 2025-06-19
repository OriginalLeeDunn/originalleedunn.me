/**
 * Smoothly scrolls to the specified element ID with an optional offset
 * @param id - The ID of the element to scroll to (without the #)
 * @param offset - Optional offset in pixels (default: 80)
 */
export function scrollToSection(id: string, offset = 80) {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Handles click events for anchor links with smooth scrolling
 * @param e - The click event
 * @param offset - Optional offset in pixels (default: 80)
 */
export function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, offset = 80) {
  const href = e.currentTarget.getAttribute('href');
  
  // Only handle internal anchor links
  if (href && href.startsWith('#')) {
    e.preventDefault();
    const id = href.substring(1);
    scrollToSection(id, offset);
    
    // Update URL without adding to browser history
    if (window.history.pushState) {
      window.history.pushState({}, '', href);
    } else {
      window.location.hash = href;
    }
  }
  // External links will behave normally
}
