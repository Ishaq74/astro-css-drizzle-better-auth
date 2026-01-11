// Sheet Component Behavior
document.addEventListener('DOMContentLoaded', () => {
  // Trigger handlers
  const triggers = document.querySelectorAll('[data-sheet-trigger]');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const sheetId = trigger.getAttribute('data-for');
      const sheet = sheetId ? document.getElementById(sheetId) : trigger.closest('[data-sheet]');
      
      if (sheet) {
        const content = sheet.querySelector('[data-sheet-content]');
        const overlay = sheet.querySelector('[data-sheet-overlay]');
        
        if (content && overlay) {
          content.setAttribute('data-state', 'open');
          overlay.setAttribute('data-state', 'open');
          document.body.style.overflow = 'hidden';
          
          // Focus management
          content.focus();
          
          // Trap focus
          trapFocus(content);
        }
      }
    });
  });
  
  // Close handlers
  const closeButtons = document.querySelectorAll('[data-sheet-close]');
  
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const sheet = button.closest('[data-sheet]');
      closeSheet(sheet);
    });
  });
  
  // Overlay click to close
  const overlays = document.querySelectorAll('[data-sheet-overlay]');
  
  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      const sheet = overlay.closest('[data-sheet]');
      closeSheet(sheet);
    });
  });
  
  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openSheets = document.querySelectorAll('[data-sheet-content][data-state="open"]');
      openSheets.forEach(content => {
        const sheet = content.closest('[data-sheet]');
        closeSheet(sheet);
      });
    }
  });
  
  function closeSheet(sheet) {
    if (!sheet) return;
    
    const content = sheet.querySelector('[data-sheet-content]');
    const overlay = sheet.querySelector('[data-sheet-overlay]');
    
    if (content && overlay) {
      content.removeAttribute('data-state');
      overlay.removeAttribute('data-state');
      document.body.style.overflow = '';
    }
  }
  
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    });
  }
});
