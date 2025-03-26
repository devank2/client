export const maskUsername = (username: string): string => {
    if (username.length <= 2) {
      return username; 
    }
    return `${username.slice(0, 2)}***`; 
  };