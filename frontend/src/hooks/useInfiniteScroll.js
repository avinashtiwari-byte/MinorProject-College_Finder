import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for implementing infinite scroll
 * @param {Function} fetchMore - Function to fetch more data
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {number} threshold - Distance from bottom in pixels to trigger fetch (default: 100)
 * @returns {boolean} - Whether currently loading
 */
export const useInfiniteScroll = (fetchMore, hasMore, threshold = 100) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = useCallback(async () => {
    if (isLoading || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    const isNearBottom = scrollHeight - scrollTop - clientHeight <= threshold;

    if (isNearBottom && !isLoading && hasMore) {
      setIsLoading(true);
      try {
        await fetchMore();
      } catch (error) {
        console.error('Error fetching more data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [fetchMore, hasMore, isLoading, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Initial load
  useEffect(() => {
    handleScroll();
  }, []);

  return isLoading;
};

/**
 * Custom hook for intersection observer based infinite scroll
 * @param {Function} fetchMore - Function to fetch more data
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {string} rootMargin - Margin around the root (default: '100px')
 * @returns {object} - ref for the sentinel element and loading state
 */
export const useIntersectionObserver = (fetchMore, hasMore, rootMargin = '100px') => {
  const [isLoading, setIsLoading] = useState(false);
  const [observer, setObserver] = useState(null);

  const handleIntersection = useCallback(
    async (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && hasMore) {
        setIsLoading(true);
        try {
          await fetchMore();
        } catch (error) {
          console.error('Error fetching more data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [fetchMore, hasMore, isLoading]
  );

  const sentinelRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer) {
        observer.disconnect();
      }

      if (node) {
        const newObserver = new IntersectionObserver(handleIntersection, {
          rootMargin,
        });
        newObserver.observe(node);
        setObserver(newObserver);
      }
    },
    [handleIntersection, rootMargin, isLoading, observer]
  );

  useEffect(() => {
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer]);

  return { sentinelRef, isLoading };
};

export default useInfiniteScroll;