/**
 * Formats any time string into 12-hour format with AM/PM indicator.
 * Handles standard 24-hour times (e.g., "14:30" -> "2:30 PM")
 * as well as legacy/clinic hour times (e.g., "02:30" -> "2:30 PM" since clinic is open in afternoon/evening).
 */
export function formatTimeTo12Hour(timeStr: string): string {
  if (!timeStr) return '';
  const clean = timeStr.trim();
  
  // If already formatted with AM/PM, return normalized
  const upper = clean.toUpperCase();
  if (upper.includes('AM') || upper.includes('PM') || upper.includes('مساءً') || upper.includes('صباحاً')) {
    let result = upper;
    if (result.includes('مساءً')) {
      result = result.replace('مساءً', '').trim() + ' PM';
    } else if (result.includes('صباحاً')) {
      result = result.replace('صباحاً', '').trim() + ' AM';
    }
    return result;
  }

  const parts = clean.split(':');
  if (parts.length < 2) return timeStr;
  
  let hour = parseInt(parts[0], 10);
  const minutes = parts[1].slice(0, 2);
  if (isNaN(hour)) return timeStr;

  let ampm = 'AM';
  
  if (hour >= 12) {
    ampm = 'PM';
    hour = hour % 12;
  } else if (hour >= 1 && hour <= 11) {
    // Clinic hours are 2 PM - 10 PM. Assume 1-11 is PM
    ampm = 'PM';
  } else if (hour === 0) {
    hour = 12;
    ampm = 'AM';
  }

  if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${minutes} ${ampm}`;
}
