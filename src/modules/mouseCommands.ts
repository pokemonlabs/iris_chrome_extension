import { ClickCommand, DoubleClickCommand, MouseMoveCommand } from "./commandTypes";
import { describeElement } from "./commandUtils";

/**
 * Simulate a mouse click at the specified coordinates
 */
export async function handleClick(command: ClickCommand): Promise<string> {
  const { x, y, button } = command;
  const element = document.elementFromPoint(x, y);
  
  if (!element) {
    throw new Error(`No element found at coordinates (${x}, ${y})`);
  }

  // Add this new handling for input elements with custom attributes
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    // Ensure element is focused and cursor is placed
    element.focus();
    
    // Set selection range to place cursor at end
    const length = element.value.length;
    element.setSelectionRange(length, length);
    
    // Dispatch focus and input events
    element.dispatchEvent(new Event('focus', { bubbles: true }));
    element.dispatchEvent(new Event('input', { bubbles: true }));
    
    // Handle custom JS actions if present
    const jsAction = element.getAttribute('jsaction');
    if (jsAction) {
      const clickAction = jsAction.split(';').find(a => a.startsWith('click:'));
      if (clickAction) {
        const event = new CustomEvent('click', {
          bubbles: true,
          detail: { action: clickAction }
        });
        element.dispatchEvent(event);
      }
    }
    
    return `Clicked and focused input at (${x}, ${y}) on ${describeElement(element)}`;
  }
  
  // Try multiple approaches for the most reliable click simulation

  // 1. First approach: Use standard MouseEvents with screen coordinates
  const screenX = window.screenX + x;
  const screenY = window.screenY + y;
  
  // Create more detailed mouse events with view context and screen coordinates
  const mouseDownOptions: MouseEventInit = {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: x,
    clientY: y,
    screenX: screenX,
    screenY: screenY,
    button: button - 1, // DOM API uses 0 for left, 1 for middle, 2 for right
    buttons: button === 1 ? 1 : button === 3 ? 2 : 0, // bitmap: 1 for left, 2 for right
    detail: 1
  };
  
  const mouseUpOptions: MouseEventInit = { ...mouseDownOptions };
  const clickOptions: MouseEventInit = { ...mouseDownOptions };
  
  // Create the events
  const mouseDown = new MouseEvent('mousedown', mouseDownOptions);
  const mouseUp = new MouseEvent('mouseup', mouseUpOptions);
  const click = new MouseEvent('click', clickOptions);
  
  // Dispatch events to the target element
  element.dispatchEvent(mouseDown);
  element.dispatchEvent(mouseUp);
  
  // For right-click, dispatch contextmenu event instead of click
  if (button === 3) {
    const contextMenu = new MouseEvent('contextmenu', {
      ...mouseDownOptions,
      button: 2
    });
    element.dispatchEvent(contextMenu);
    
    // Try to simulate native behavior by delaying a bit
    await new Promise(resolve => setTimeout(resolve, 10));
    
    return `Right-clicked at (${x}, ${y}) on ${describeElement(element)}`;
  } else {
    element.dispatchEvent(click);
    
    // 2. Special handling for links, buttons, and inputs
    if (element instanceof HTMLAnchorElement && element.href) {
      // For links, if the click didn't navigate, try directly triggering navigation
      if (element.target === '_blank' || element.target === '_new') {
        window.open(element.href, '_blank');
      } else {
        window.location.href = element.href;
      }
    } else if (element instanceof HTMLButtonElement) {
      // For buttons, try forcing the click
      element.click();
    } else if (element instanceof HTMLInputElement) {
      // For inputs, focus and click
      element.focus();
      element.click();
      
      // Special handling for checkboxes
      if (element.type === 'checkbox' || element.type === 'radio') {
        // Toggle checked state if it didn't change from the click
        element.checked = !element.checked;
      }
    } else {
      // 3. Direct element.click() as fallback
      try {
        if (element instanceof HTMLElement) {
          element.focus();
          element.click();
        }
      } catch (err) {
        console.warn('Direct click() failed:', err);
      }
    }
    
    // 4. Use more direct method to ensure element interaction
    try {
      // Handle dialog boxes and other special elements by focusing first
      if (element instanceof HTMLElement) {
        // Focus and manually trigger relevant events
        element.focus();
        
        // For form elements, try more specific interactions
        if (element instanceof HTMLSelectElement) {
          element.click();
          // Trigger a change event to ensure UI updates
          element.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
          // For text inputs, ensure they're both focused and clicked
          element.click();
          element.dispatchEvent(new Event('focus', { bubbles: true }));
        }
      }
    } catch (err) {
      console.warn('Advanced element interaction failed:', err);
    }
    
    return `Clicked at (${x}, ${y}) on ${describeElement(element)}`;
  }
}

/**
 * Simulate a double click at the specified coordinates
 */
export async function handleDoubleClick(command: DoubleClickCommand): Promise<string> {
  const { x, y } = command;
  const element = document.elementFromPoint(x, y);
  
  if (!element) {
    throw new Error(`No element found at coordinates (${x}, ${y})`);
  }
  
  // Add screen coordinates for more accurate simulation
  const screenX = window.screenX + x;
  const screenY = window.screenY + y;
  
  // Create the base options for mouse events
  const mouseEventOptions: MouseEventInit = {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: x,
    clientY: y,
    screenX: screenX,
    screenY: screenY,
    button: 0,
    buttons: 1,
    detail: 1
  };
  
  // First simulate a single click (down-up-click)
  const mouseDown1 = new MouseEvent('mousedown', { ...mouseEventOptions });
  const mouseUp1 = new MouseEvent('mouseup', { ...mouseEventOptions });
  const click1 = new MouseEvent('click', { ...mouseEventOptions });
  
  element.dispatchEvent(mouseDown1);
  element.dispatchEvent(mouseUp1);
  element.dispatchEvent(click1);
  
  // Add a delay to simulate human behavior (typically 100-150ms between clicks)
  await new Promise(resolve => setTimeout(resolve, 120));
  
  // Now simulate the second click with increased detail count
  const mouseDown2 = new MouseEvent('mousedown', { 
    ...mouseEventOptions,
    detail: 2 
  });
  const mouseUp2 = new MouseEvent('mouseup', { 
    ...mouseEventOptions,
    detail: 2 
  });
  const click2 = new MouseEvent('click', { 
    ...mouseEventOptions,
    detail: 2 
  });
  
  element.dispatchEvent(mouseDown2);
  element.dispatchEvent(mouseUp2);
  element.dispatchEvent(click2);
  
  // Finally dispatch the actual dblclick event
  const dblClick = new MouseEvent('dblclick', {
    ...mouseEventOptions,
    detail: 2
  });
  
  element.dispatchEvent(dblClick);
  
  // Try direct approach for HTMLElements
  if (element instanceof HTMLElement) {
    try {
      // Some websites have special handling for dblclick
      // Try triggering click() twice
      element.click();
      element.click();
    } catch(err) {
      console.warn('Direct double click approach failed:', err);
    }
  }
  
  // Try to force the interaction based on element type
  try {
    // Handle specific element types that might need special handling
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      // Ensure text inputs are focused and selected
      element.focus();
      element.select();
    } else if (element instanceof HTMLSelectElement) {
      // For dropdown elements
      element.focus();
      element.click();
      element.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (element instanceof HTMLElement) {
      // Simulate a more natural double-click for other elements
      element.dispatchEvent(new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 2,
        clientX: x,
        clientY: y,
        screenX: screenX,
        screenY: screenY
      }));
    }
  } catch (err) {
    console.warn('Advanced double-click interaction failed:', err);
  }
  
  return `Double-clicked at (${x}, ${y}) on ${describeElement(element)}`;
}

/**
 * Simulate mouse movement to the specified coordinates
 */
export async function handleMouseMove(command: MouseMoveCommand): Promise<string> {
  const { x, y } = command;
  const element = document.elementFromPoint(x, y);
  
  if (!element) {
    throw new Error(`No element found at coordinates (${x}, ${y})`);
  }
  
  // Get screen coordinates for more accurate simulation
  const screenX = window.screenX + x;
  const screenY = window.screenY + y;
  
  // Create detailed mouse move event
  const mouseMoveOptions: MouseEventInit = {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: x,
    clientY: y,
    screenX: screenX,
    screenY: screenY,
    buttons: 0 // No buttons pressed during move
  };
  
  // Create and dispatch the main mousemove event
  const mouseMove = new MouseEvent('mousemove', mouseMoveOptions);
  element.dispatchEvent(mouseMove);
  
  // Also dispatch mouseover and mouseenter events for more realistic behavior
  const mouseOver = new MouseEvent('mouseover', mouseMoveOptions);
  element.dispatchEvent(mouseOver);
  
  // mouseenter doesn't bubble, so it's only dispatched directly to the target
  const mouseEnter = new MouseEvent('mouseenter', {
    ...mouseMoveOptions,
    bubbles: false
  });
  element.dispatchEvent(mouseEnter);
  
  // Try additional hover event for better interaction
  try {
    // Trigger hover state explicitly for better compatibility with CSS :hover
    if (element instanceof HTMLElement) {
      // Create and dispatch a hover-related event
      const hoverEvent = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: x,
        clientY: y,
        screenX: screenX,
        screenY: screenY
      });
      
      // Dispatch both to element and its parent for CSS hover state propagation
      element.dispatchEvent(hoverEvent);
      
      // For special elements that might have dropdown menus
      if (element instanceof HTMLSelectElement || 
          element.tagName === 'BUTTON' || 
          element.getAttribute('role') === 'button') {
        element.focus();
      }
    }
  } catch (err) {
    console.warn('Advanced hover interaction failed:', err);
  }
  
  return `Moved mouse to (${x}, ${y}) over ${describeElement(element)}`;
}