import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService';
import { CustomerBlogCategoryDto } from '@/types/api';

interface UseBlogCategoriesReturn {
  categories: CustomerBlogCategoryDto[];
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch all blog categories
 */
export function useBlogCategories(): UseBlogCategoriesReturn {
  const [categories, setCategories] = useState<CustomerBlogCategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getBlogCategories();

        if (response.success && response.data) {
          setCategories(response.data as CustomerBlogCategoryDto[]);
        } else {
          throw new Error(response.message || 'Failed to fetch categories');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        console.error('[useBlogCategories] Error:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
