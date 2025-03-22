'use client';

import { useState } from 'react';
import { Network, Layers, Boxes } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function UnsupervisedLearning() {
  const algorithms = [
    {
      title: 'K-Means Clustering',
      description: 'Group similar data points into clusters',
      icon: <Boxes className="w-8 h-8 text-purple-400" />,
      path: '/unsupervised/kmeans'
    },
    {
      title: 'PCA',
      description: 'Reduce dimensionality while preserving variance',
      icon: <Layers className="w-8 h-8 text-purple-400" />,
      path: '/unsupervised/pca'
    },
    {
      title: 'DBSCAN',
      description: 'Density-based spatial clustering',
      icon: <Network className="w-8 h-8 text-purple-400" />,
      path: '/unsupervised/dbscan'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center mb-4">Unsupervised Learning</h1>
        <p className="text-xl text-center text-purple-300 mb-16">
          Discover patterns and structures in unlabeled data
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {algorithms.map((algo, index) => (
            <Link key={index} href={algo.path}>
              <Card className="h-full p-6 bg-black/50 border border-purple-500/20 hover:border-purple-500/40 
                             transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="mb-4">{algo.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{algo.title}</h3>
                <p className="text-purple-300">{algo.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}