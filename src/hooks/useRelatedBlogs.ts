import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService';
import { BlogListApiResponse, CustomerBlogCatalogDto } from '@/types/api';

interface UseRelatedBlogsParams {
  page?: number;
  size?: number;
}

interface UseRelatedBlogsReturn {
  blogs: CustomerBlogCatalogDto[];
  loading: boolean;
  error: Error | null;
  pagination: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
  } | null;
}

/**
 * Custom hook to fetch related blogs for a specific blog
 */
export function useRelatedBlogs(
  slug: string | undefined,
  params: UseRelatedBlogsParams = {}
): UseRelatedBlogsReturn {
  const [blogs, setBlogs] = useState<CustomerBlogCatalogDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<UseRelatedBlogsReturn['pagination']>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchRelatedBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getRelatedBlogs(slug, {
          page: params.page ?? 0,
          size: params.size ?? 5,
        });

        if (response.success && response.data) {
          const data = response.data as BlogListApiResponse;
          setBlogs(data.content);
          setPagination({
            number: data.number,
            size: data.size,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            first: data.first,
            last: data.last,
            numberOfElements: data.numberOfElements,
            empty: data.empty,
          });
        } else {
          throw new Error(response.message || 'Failed to fetch related blogs');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        console.error('[useRelatedBlogs] Error:', error);
        setBlogs([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedBlogs();
  }, [slug, params.page, params.size]);

  return { blogs, loading, error, pagination };
}
