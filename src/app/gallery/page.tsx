'use client';

import React from 'react';
import Image from 'next/image';
import conList from '@/utils/con_list.json';

export default function ImagesPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Image Gallery
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(conList.con_list).map(([text, imagePath]) => (
            <div key={text} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden relative">
                  <Image 
                    src={imagePath} 
                    alt={text}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<span class="text-gray-500 text-sm">Image not found</span>';
                      }
                    }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    {text}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                    {imagePath}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Usage Information
          </h3>
          <p className="text-blue-800">
            These images are automatically displayed when the corresponding text appears in chat messages.
            <span className="font-semibold ml-2">
              Total images: {Object.keys(conList.con_list).length}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
} 