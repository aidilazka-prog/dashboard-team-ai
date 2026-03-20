import { format, formatDistanceToNow, parseISO, isToday, isTomorrow, isPast, addHours } from 'date-fns';

const UTC_OFFSET = 7;

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = parseISO(dateStr);
  return format(d, 'MMM d, yyyy');
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const d = parseISO(dateStr);
  return format(d, 'MMM d, yyyy · HH:mm');
}

export function formatTime(dateStr) {
  if (!dateStr) return '';
  const d = parseISO(dateStr);
  return format(d, 'HH:mm');
}

export function formatRelative(dateStr) {
  if (!dateStr) return '';
  const d = parseISO(dateStr);
  return formatDistanceToNow(d, { addSuffix: true });
}

export function isDueToday(dateStr) {
  if (!dateStr) return false;
  return isToday(parseISO(dateStr));
}

export function isDueTomorrow(dateStr) {
  if (!dateStr) return false;
  return isTomorrow(parseISO(dateStr));
}

export function isOverdue(dateStr) {
  if (!dateStr) return false;
  return isPast(parseISO(dateStr)) && !isToday(parseISO(dateStr));
}

export function getGreeting() {
  const now = new Date();
  const hour = (now.getUTCHours() + UTC_OFFSET) % 24;
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function getCurrentDate() {
  return format(new Date(), 'EEEE, MMMM d, yyyy');
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatCurrency(amount, currency = 'IDR') {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}
