import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService';
import { CustomerBlogDetailDto } from '@/types/api';

interface UseBlogDetailReturn {
  blog: CustomerBlogDetailDto | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch a single blog by slug
 */
export function useBlogDetail(slug: string | undefined): UseBlogDetailReturn {
  const [blog, setBlog] = useState<CustomerBlogDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getBlogBySlug(slug);

        if (response.success && response.data) {
          setBlog(response.data as CustomerBlogDetailDto);
        } else {
          throw new Error(response.message || 'Blog not found');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        console.error('[useBlogDetail] Error:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  return { blog, loading, error };
}
