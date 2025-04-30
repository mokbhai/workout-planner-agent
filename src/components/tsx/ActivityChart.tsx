import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Activity {
  id: number;
  name: string;
  type: string;
  sport_type: string;
  distance: number;
  moving_time: number;
  start_date: string;
  total_elevation_gain: number;
  average_speed: number;
  average_heartrate: number;
  suffer_score: number;
}

interface ActivityChartProps {
  accessToken: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ accessToken }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.strava.com/api/v3/athlete/activities`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch activities: ${response.status}`);
        }

        const data = await response.json();
        setActivities(data || []);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchActivities();
    } else {
      setError("No access token provided");
      setLoading(false);
    }
  }, [accessToken]);

  // Process activities to count by sport type
  const getSportTypeData = () => {
    const sportTypeCount: Record<string, number> = {};
    const sportTypeDistance: Record<string, number> = {};
    const sportTypeTime: Record<string, number> = {};

    activities.forEach((activity) => {
      const sportType = activity.sport_type || activity.type || "Unknown";

      // Count activities by sport type
      sportTypeCount[sportType] = (sportTypeCount[sportType] || 0) + 1;

      // Sum distance by sport type (convert to km)
      sportTypeDistance[sportType] =
        (sportTypeDistance[sportType] || 0) + activity.distance / 1000;

      // Sum time by sport type (convert to hours)
      sportTypeTime[sportType] =
        (sportTypeTime[sportType] || 0) + activity.moving_time / 3600;
    });

    return {
      labels: Object.keys(sportTypeCount),
      countData: Object.values(sportTypeCount),
      distanceData: Object.values(sportTypeDistance),
      timeData: Object.values(sportTypeTime),
    };
  };

  const chartData = getSportTypeData();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Activities by Sport Type",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Number of Activities",
        data: chartData.countData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Distance (km)",
        data: chartData.distanceData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Time (hours)",
        data: chartData.timeData,
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading activities: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              No activities found. Start recording your workouts to see them
              here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
      <div className="h-80">
        <Bar options={options} data={data} />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {chartData.labels.map((sportType, index) => (
          <div key={sportType} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">{sportType}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                Activities:{" "}
                <span className="font-medium">
                  {chartData.countData[index]}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Distance:{" "}
                <span className="font-medium">
                  {chartData.distanceData[index].toFixed(1)} km
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Time:{" "}
                <span className="font-medium">
                  {chartData.timeData[index].toFixed(1)} hours
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityChart;
