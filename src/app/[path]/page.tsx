'use client';

import React, { useState, useEffect } from 'react';
import LoadingPage from '@/components/LoadingPage';
import ErrorPage from '@/components/ErrorPage';
import styles from './page.module.css';
import { processHtmlContent } from '@/utils/htmlProcessor';

interface PageProps {
  params: Promise<{
    path: string;
  }>;
}

export default function DynamicPage({ params }: PageProps) {
  const { path } = React.use(params);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/puppeteer-proxy?path=${path}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        // Process the content before setting it
        const processedContent = processHtmlContent(content);
        setHtmlContent(processedContent);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchContent();

    // Set up interval for repeated fetching (every 5 seconds)
    const interval = setInterval(fetchContent, 100000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [path]);

  if (loading && !htmlContent) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className={styles.pageContainer} dangerouslySetInnerHTML={{ __html: htmlContent }}/>
  );
} 