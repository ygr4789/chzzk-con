'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Chzzk Chat Proxy
          </h1>
          <p className="text-xl">
            A Next.js application that displays Chzzk chat content with real-time updates
          </p>
        </div>

        <div className="shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            How to Use
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Base Chat</h3>
              <p>Visit the base chat by going to:</p>
              <code className="px-2 py-1 rounded text-sm font-mono">
                /api/puppeteer-proxy
              </code>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Specific Chat Room</h3>
              <p>Visit a specific chat room by going to:</p>
              <code className="px-2 py-1 rounded text-sm font-mono">
                /api/puppeteer-proxy?path=fb4a6e81576c0607de6779ae5ca812db
              </code>
            </div>
          </div>
        </div>

        <div className="shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Features
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Real-time content updates every 5 seconds</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Content manipulation (text replacement)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Persistent browser session for performance</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Automatic script removal for security</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Image replacement for specific text patterns</span>
            </li>
          </ul>
        </div>

        <div className="shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Image Gallery
          </h2>
          <p className="mb-4">
            View all available images that are automatically displayed when specific text appears in chat messages.
          </p>
          <a 
            href="/gallery" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            View Image Gallery →
          </a>
        </div>

        <div className="shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Example URLs
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm mb-1">Base chat:</p>
              <a 
                href="/api/puppeteer-proxy" 
                className="underline text-sm font-mono"
              >
                /api/puppeteer-proxy
              </a>
            </div>
            <div>
              <p className="text-sm mb-1">Specific chat room:</p>
              <a 
                href="/api/puppeteer-proxy?path=fb4a6e81576c0607de6779ae5ca812db" 
                className="underline text-sm font-mono"
              >
                /api/puppeteer-proxy?path=fb4a6e81576c0607de6779ae5ca812db
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
