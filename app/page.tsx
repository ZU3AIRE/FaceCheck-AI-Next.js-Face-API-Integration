"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Types for our table data
type DetectionRow = {
  id: string;
  timestamp: string;
  confidence: number;
  personName?: string;
  type: 'check-in' | 'check-out'; // Add this line
};

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [detections, setDetections] = useState<DetectionRow[]>([]);

  // Add this inside the Home component
  const addDetection = (detection: DetectionRow) => {
    setDetections(prev => [detection, ...prev].slice(0, 50)); // Keep last 50 entries
  };

  // Handle camera setup
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
        });
    }
  }, []);

  // Example API call implementation
  useEffect(() => {
    const fetchDetections = async () => {
      try {
        const response = await fetch('/api/detections');
        const data = await response.json();
        if (data.detection) {
          addDetection({
            id: Date.now().toString(),
            timestamp: new Date().toLocaleTimeString(),
            confidence: data.detection.confidence,
            personName: data.detection.name,
            type: 'check-in' // Example type
          });
        }
      } catch (error) {
        console.error('Error fetching detections:', error);
      }
    };

    // Poll every 5 seconds
    // const interval = setInterval(fetchDetections, 5000);
    // return () => clearInterval(interval);

    // Example data with check-in/check-out types
    addDetection({ id: 'xx01x', timestamp: new Date().toLocaleTimeString(), confidence: 0.95, personName: 'John Doe', type: 'check-in' });
    addDetection({ id: 'xx02x', timestamp: new Date().toLocaleTimeString(), confidence: 0.85, personName: 'Jane Doe', type: 'check-out' });
    addDetection({ id: 'xx03x', timestamp: new Date().toLocaleTimeString(), confidence: 0.75, personName: 'Alice', type: 'check-in' });
    addDetection({ id: 'xx04x', timestamp: new Date().toLocaleTimeString(), confidence: 0.65, personName: 'Bob', type: 'check-out' });
    addDetection({ id: 'xx05x', timestamp: new Date().toLocaleTimeString(), confidence: 0.55, personName: 'Charlie', type: 'check-in' });
    addDetection({ id: 'xx06x', timestamp: new Date().toLocaleTimeString(), confidence: 0.45, personName: 'Dave', type: 'check-out' });
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8">
      <header className="flex justify-between items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={25}
          priority
        />
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Camera View */}
        <div className="rounded-lg overflow-hidden bg-black/5 p-4">
          <h2 className="text-xl font-bold mb-4">Live Camera Feed</h2>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full aspect-video rounded-lg bg-black scale-x-[-1]"
          />
        </div>

        {/* Detections Table */}
        <div className="rounded-lg overflow-hidden bg-black/5 p-4">
          <h2 className="text-xl font-bold mb-4">Detection History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="py-2 px-4 text-left">Time</th>
                  <th className="py-2 px-4 text-left">Person</th>
                  <th className="py-2 px-4 text-left">Confidence</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {detections.map((row) => (
                  <tr 
                    key={row.id} 
                    className="border-b dark:border-gray-700 hover:bg-black/5"
                  >
                    <td className="py-2 px-4">{row.timestamp}</td>
                    <td className="py-2 px-4">{row.personName || 'Unknown'}</td>
                    <td className="py-2 px-4">{(row.confidence * 100).toFixed(1)}%</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${row.type === 'check-in' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {row.type === 'check-in' ? 'Check In' : 'Check Out'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="flex gap-6 justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
