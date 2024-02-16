import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const ExpenseChart = ({ arr }: { arr: any }) => {
	let newArr = arr?.map((s: any) => {
		return s.amount;
	}) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
	};

	const labels = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const data = {
		labels,
		datasets: [
			{
				label: "Earnings",
				data: newArr,
				borderColor: "#0042FF",
				backgroundColor: "rgba(0, 66, 255, 0.05)",
			},
		],
	};

	return <Line options={options} data={data} />;
};

export default ExpenseChart;
