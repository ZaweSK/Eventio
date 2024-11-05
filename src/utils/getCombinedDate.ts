export const getCombinedDate = (date: Date, time: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
  
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
  
    const combinedDate = new Date(year, month, day, hours, minutes, seconds);
    return combinedDate.toISOString();
  };