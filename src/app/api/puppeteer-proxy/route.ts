import { NextRequest, NextResponse } from 'next/server';
import puppeteer, { Browser, Page } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// Global variables to keep browser and page in memory
let browser: Browser | null = null;
let page: Page | null = null;
let isInitializing = false;

// Internal cleanup function (not exported)
async function cleanup() {
  if (page) {
    await page.close();
    page = null;
  }
  if (browser) {
    await browser.close();
    browser = null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '';
  
  try {
    const targetUrl = `https://chzzk.naver.com/chat${path ? `/${path}` : ''}`;
    
    // If already initializing, wait
    if (isInitializing) {
      console.log('Waiting for initialization to complete...');
      while (isInitializing) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    // If we have a page, get current content
    if (page && browser) {
      console.log('Getting current page content');
      const html = await page.content();
      const modifiedHtml = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<script[^>]*>/gi, '');
      
      return new NextResponse(modifiedHtml, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
    // Start initialization
    isInitializing = true;
    console.log('Initializing browser and navigating to', targetUrl);
    
    // Launch browser (only once) with serverless-compatible configuration
    if (!browser) {
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    }
    
    // Create new page
    page = await browser.newPage();
    
    // Set viewport and user agent
    await page.setViewport({ width: 1280, height: 720 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to the page (only once)
    console.log('navigating to', targetUrl);
    await page.goto(targetUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    console.log('navigated to', targetUrl);
    
    // Wait for content to load (look for specific elements)
    console.log('waiting for root');
    await page.waitForSelector('#root', { timeout: 10000 });
    console.log('root found');
    
    // Wait a bit more for manipulations to take effect
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mark initialization as complete
    isInitializing = false;
    console.log('Initialization complete, page ready');
    
    // Get the current HTML content
    const html = await page.content();
    
    // Remove all script tags from the final HTML after manipulation
    const modifiedHtml = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<script[^>]*>/gi, '');
    
    return new NextResponse(modifiedHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
    
  } catch (error) {
    isInitializing = false;
    console.error('Puppeteer proxy error:', error);
    
    // Cleanup on error
    await cleanup();
    
    return NextResponse.json({ 
      error: 'Failed to render content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 