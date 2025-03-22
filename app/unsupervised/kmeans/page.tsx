'use client';

import { useState, useEffect } from 'react';
import { Boxes, Settings, Play, Pause, RefreshCw, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { FileUpload } from '@/components/ui/file-upload';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const KMeansPage = () => {
  const [numClusters, setNumClusters] = useState(3);
  const [data, setData] = useState([]);
  const [centroids, setCentroids] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [iterations, setIterations] = useState(0);

  useEffect(() => {
    // Generate random data points
    const newData = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setData(newData);
    initializeCentroids(newData);
  }, []);

  const handleDataUpload = (uploadedData: any[]) => {
    // Assuming the CSV has 'x' and 'y' columns for 2D clustering
    const processedData = uploadedData.map(row => ({
      x: Number(row.x),
      y: Number(row.y)
    }));
    
    setData(processedData);
    initializeCentroids(processedData);
    setIterations(0);
    setIsRunning(false);
  };

  const initializeCentroids = (points) => {
    const newCentroids = Array.from({ length: numClusters }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setCentroids(newCentroids);
    setAssignments(Array(points.length).fill(0));
  };

  const distance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
    );
  };

  const assignPointsToClusters = () => {
    const newAssignments = data.map(point => {
      let minDist = Infinity;
      let clusterId = 0;
      centroids.forEach((centroid, i) => {
        const dist = distance(point, centroid);
        if (dist < minDist) {
          minDist = dist;
          clusterId = i;
        }
      });
      return clusterId;
    });
    setAssignments(newAssignments);
  };

  const updateCentroids = () => {
    const newCentroids = centroids.map((_, i) => {
      const clusterPoints = data.filter((_, index) => assignments[index] === i);
      if (clusterPoints.length === 0) return centroids[i];

      const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
      const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
      return {
        x: sumX / clusterPoints.length,
        y: sumY / clusterPoints.length
      };
    });
    setCentroids(newCentroids);
  };

  const runKMeans = () => {
    setIsRunning(true);
    const step = () => {
      if (!isRunning) return;

      assignPointsToClusters();
      updateCentroids();
      setIterations(prev => prev + 1);

      setTimeout(step, 500);
    };
    step();
  };

  const reset = () => {
    setIsRunning(false);
    setIterations(0);
    initializeCentroids(data);
  };

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000'];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Boxes className="w-12 h-12 text-purple-400 mr-4" />
          <div>
            <h1 className="text-4xl font-bold text-purple-400">K-Means Clustering</h1>
            <p className="text-gray-300">Interactive visualization of K-means clustering algorithm</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Data Upload */}
          <Card className="bg-gray-900 border-purple-700 p-6 md:col-span-2">
            <div className="flex items-center mb-6">
              <Upload className="w-6 h-6 text-purple-400 mr-2" />
              <h2 className="text-2xl font-bold text-purple-400">Upload Clustering Data</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 mb-4">
                  Upload a CSV file with 'x' and 'y' columns to cluster your own data points.
                </p>
                <FileUpload onDataLoaded={handleDataUpload} />
              </div>
              <div className="flex items-center justify-center border-l border-purple-500/20 pl-8">
                <div className="text-center">
                  <p className="text-purple-400 mb-2">Current Dataset</p>
                  <p className="text-2xl font-bold text-purple-300">{data.length} points</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Clustering Visualization */}
          <Card className="bg-gray-900 border-purple-700 p-6 md:col-span-2">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">Clustering Visualization</h2>
            <div className="h-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis type="number" dataKey="x" stroke="#fff" />
                  <YAxis type="number" dataKey="y" stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #666' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  {/* Data points */}
                  {Array.from({ length: numClusters }).map((_, i) => (
                    <Scatter
                      key={`cluster-${i}`}
                      name={`Cluster ${i + 1}`}
                      data={data.filter((_, index) => assignments[index] === i)}
                      fill={colors[i % colors.length]}
                    />
                  ))}
                  {/* Centroids */}
                  <Scatter
                    name="Centroids"
                    data={centroids}
                    fill="#fff"
                    shape="star"
                    size={100}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Controls */}
          <Card className="bg-gray-900 border-purple-700 p-6 md:col-span-2">
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-purple-400 mr-2" />
              <h2 className="text-2xl font-bold text-purple-400">Algorithm Controls</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Clusters: {numClusters}
                </label>
                <Slider
                  value={[numClusters]}
                  onValueChange={([value]) => {
                    setNumClusters(value);
                    initializeCentroids(data);
                  }}
                  min={2}
                  max={5}
                  step={1}
                  className="mb-6"
                />
              </div>

              <div className="flex flex-col justify-end">
                <div className="bg-black p-4 rounded-lg border border-purple-700 mb-4">
                  <p className="text-purple-400">Iterations</p>
                  <p className="text-2xl font-bold text-purple-300">{iterations}</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      if (isRunning) {
                        setIsRunning(false);
                      } else {
                        runKMeans();
                      }
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" /> Start
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={reset}
                    className="flex-1 border-purple-500 text-purple-300 hover:bg-purple-900"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KMeansPage;