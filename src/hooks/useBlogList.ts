import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService';
import { BlogListApiResponse, CustomerBlogCatalogDto } from '@/types/api';

interface UseBlogListParams {
  page?: number;
  size?: number;
  search?: string;
  categoryId?: number;
  sortBy?: string;
  direction?: 'ASC' | 'DESC';
}

interface UseBlogListReturn {
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
 * Custom hook to fetch paginated blog list with optional search, filters, and sorting
 */
export function useBlogList(params: UseBlogListParams = {}): UseBlogListReturn {
  const [blogs, setBlogs] = useState<CustomerBlogCatalogDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<UseBlogListReturn['pagination']>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiService.getBlogList({
          page: params.page ?? 0,
          size: params.size ?? 20,
          search: params.search,
          categoryId: params.categoryId,
          sortBy: params.sortBy ?? 'id',
          direction: params.direction ?? 'DESC',
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
          throw new Error(response.message || 'Failed to fetch blogs');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        console.error('[useBlogList] Error:', error);
        setBlogs([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [params.page, params.size, params.search, params.categoryId, params.sortBy, params.direction]);

  return { blogs, loading, error, pagination };
}
