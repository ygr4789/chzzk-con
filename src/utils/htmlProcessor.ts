import conList from './con_list.json';

/**
 * Processes HTML content by replacing specific text patterns with HTML elements
 * @param content - The raw HTML content to process
 * @returns The processed HTML content
 */
export const processHtmlContent = (content: string): string => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    // Server-side: just return the original content
    return content;
  }

  try {
    // Create a temporary DOM element to parse and manipulate HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Find all spans with class containing 'live_chatting_message_text'
    const spans = doc.querySelectorAll('[class*="live_chatting_message_text"]');
    
    spans.forEach((span) => {
      const textContent = span.textContent?.trim();
      
      if (textContent && (conList.con_list as Record<string, string>)[textContent]) {
        const imagePath = (conList.con_list as Record<string, string>)[textContent];
        // Create a wrapper div
        const wrapperDiv = doc.createElement('div');
        wrapperDiv.style.width = '200px';
        wrapperDiv.style.height = '200px';
        
        // Create a new img element to replace the span
        const imgElement = doc.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = textContent;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'contain';
        
        // Add img to wrapper
        wrapperDiv.appendChild(imgElement);
        
        // Replace the span with the wrapper div
        span.parentNode?.replaceChild(wrapperDiv, span);
      }
    });
    
    // Convert back to string
    return doc.documentElement.innerHTML;
  } catch (error) {
    console.error('Error processing HTML content:', error);
    return content; // Return original content if processing fails
  }
}; 