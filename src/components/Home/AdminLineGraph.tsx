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

const AdminLineChart = ({
	val,
	label,
	color,
}: {
	val: any;
	label: string;
	color: string;
}) => {
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
				label,
				data: Array.isArray(val)
					? [...val]
					: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				borderColor: color,
				backgroundColor: color,
			},
		],
	};

	return <Line options={options} data={data} />;
};

export default AdminLineChart;
