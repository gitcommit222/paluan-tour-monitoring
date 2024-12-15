"use client";
import React, { useState } from "react"; // Add useState
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
  const [selectedMonth, setSelectedMonth] = useState("all"); // Add state for month filter

  // Get unique months from guest data
  const getUniqueMonths = () => {
    if (!guestData?.tourists) return [];
    
    const months = guestData.tourists.map(guest => 
      format(new Date(guest.visitDate), "MMMM yyyy")
    );
    return [...new Set(months)];
  };

  // Add calculations for DataBox values with filtering
  const calculateStats = () => {
    if (!guestData?.tourists) return { total: 0, male: 0, female: 0 };

    const filteredGuests = selectedMonth === "all" 
      ? guestData.tourists
      : guestData.tourists.filter(guest => 
          format(new Date(guest.visitDate), "MMMM yyyy") === selectedMonth
        );

    return {
      total: filteredGuests.length,
      male: filteredGuests.filter(guest => guest?.gender === "Male").length,
      female: filteredGuests.filter(guest => guest?.gender === "Female").length
    };
  };

  const stats = calculateStats();

  // Process guest data to count guests per month
  const processGuestData = () => {
    if (!guestData?.tourists) return null;

    const monthCounts = {};
    const relevantGuests = selectedMonth === "all" 
      ? guestData.tourists
      : guestData.tourists.filter(guest => 
          format(new Date(guest.visitDate), "MMMM yyyy") === selectedMonth
        );

    relevantGuests.forEach((guest) => {
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
      
      {/* Add month filter dropdown */}
      <div className="mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full md:w-64 p-2 border rounded-lg shadow-sm"
        >
          <option value="all">All Months</option>
          {getUniqueMonths().map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* DataBox grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6">
        <DataBox
          icon={tourist}
          title="Total Tourist"
          data={stats.total.toString()}
          color="green"
        />
        <DataBox
          icon={male}
          title="Male Tourist"
          data={stats.male.toString()}
          color="red"
        />
        <DataBox
          icon={female}
          title="Female Tourist"
          data={stats.female.toString()}
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