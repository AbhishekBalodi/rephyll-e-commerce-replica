import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService';

interface UseBlogSearchSuggestionsReturn {
  suggestions: string[];
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch blog search suggestions/autocomplete results
 */
export function useBlogSearchSuggestions(
  query: string,
  limit: number = 10
): UseBlogSearchSuggestionsReturn {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getBlogSearchSuggestions(query, limit);
        
        // Handle ApiResponse wrapper
        const suggestionsList = (response && typeof response === 'object' && 'success' in response && response.success)
          ? (response.data || [])
          : (response?.data || []);
        
        setSuggestions(Array.isArray(suggestionsList) ? suggestionsList : []);
      } catch (err) {
        console.error('Error fetching blog search suggestions:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch suggestions'));
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce to avoid too many requests
    const debounceTimer = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, limit]);

  return { suggestions, loading, error };
}
