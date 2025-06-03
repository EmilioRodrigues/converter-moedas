
// Input sanitization utility functions
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove potentially dangerous characters and HTML tags
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"&]/g, (char) => { // Escape dangerous characters
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim()
    .slice(0, 1000); // Limit length to prevent DoS
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
};

export const validateSubject = (subject: string): boolean => {
  return subject.length >= 3 && subject.length <= 200;
};

export const validateMessage = (message: string): boolean => {
  return message.length >= 10 && message.length <= 1000;
};
