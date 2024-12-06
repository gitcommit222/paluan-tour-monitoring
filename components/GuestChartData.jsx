"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetTouristByResortId } from "@/hooks/useGuest";
import { format } from "date-fns";
import DataBox from "@/components/DataBox";
import { female, male, tourist } from "@/public";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GuestChartData = ({ resortId }) => {
  const { data: guestData } = useGetTouristByResortId(resortId);

  // Add calculations for DataBox values
  const totalTourists = guestData?.tourists?.length || 0;
  const maleTourists = guestData?.tourists?.filter(guest => guest?.gender === "Male").length || 0;
  const femaleTourists = guestData?.tourists?.filter(guest => guest?.gender === "Female").length || 0;

  // Process guest data to count guests per month
  const processGuestData = () => {
    if (!guestData?.tourists) return null;

    const monthCounts = {};
    guestData.tourists.forEach((guest) => {
      const monthYear = format(new Date(guest.visitDate), "MMMM yyyy");
      monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
    });

    return {
      labels: Object.keys(monthCounts),
      datasets: [
        {
          label: "Number of Guests",
          data: Object.values(monthCounts),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          borderColor: "rgb(53, 162, 235)",
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Guest Distribution",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const chartData = processGuestData();

  if (!chartData) return null;

  return (
    <div className="rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Guest Statistics
      </h2>
      
      {/* Add DataBox grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6">
        <DataBox
          icon={tourist}
          title="Total Tourist"
          data={totalTourists.toString()}
          color="green"
        />
        <DataBox
          icon={male}
          title="Male Tourist"
          data={maleTourists.toString()}
          color="red"
        />
        <DataBox
          icon={female}
          title="Female Tourist"
          data={femaleTourists.toString()}
          color="yellow"
        />
      </div>

      <div className="bg-white rounded-lg p-4 shadow-inner h-[400px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GuestChartData;
