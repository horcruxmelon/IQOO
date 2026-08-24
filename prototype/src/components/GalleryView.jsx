import React from 'react';
import { MOCK_GALLERY_SECTIONS } from '../data/mockData';

export default function GalleryView({ onSelectPhoto }) {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-3 py-3 space-y-5 text-white">
      {MOCK_GALLERY_SECTIONS.map(section => (
        <div key={section.month} className="space-y-2">
          <h2 className="text-sm font-extrabold text-white px-1 tracking-tight">{section.month}</h2>

          <div className="grid grid-cols-3 gap-1.5">
            {section.items.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectPhoto?.(item)}
                className={`relative overflow-hidden bg-neutral-900 border border-neutral-800/60 cursor-pointer group ${
                  item.featured
                    ? 'col-span-3 h-40 rounded-2xl'
                    : 'aspect-square rounded-lg'
                }`}
              >
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 group-active:scale-95 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
