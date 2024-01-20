let timeoutId: NodeJS.Timeout;

export default function debounce(function_: () => void, delay: number): void {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    function_();
  }, delay);
}
