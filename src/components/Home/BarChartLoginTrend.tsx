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

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BarChartLoginTrend = ({ arr }: { arr: any }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
	};

	const labels = arr?.map((val: any) => {
		return val.month;
	}) || ["Month"];

	const values = arr?.map((val: any) => {
		return Number(val.count);
	}) || [0];

	const data = {
		labels,
		datasets: [
			{
				label: "Login Trend",
				data: values,
				borderColor: "#0241FF",
				backgroundColor: "#0241FF",
			},
		],
	};

	return <Bar data={data} options={options} />;
};

export default BarChartLoginTrend;
