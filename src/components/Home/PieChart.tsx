import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ arr, labels }: { arr: any; labels: any }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "right" as const,
			},
		},
	};

	const data = {
		labels: Array.isArray(labels) ? [...labels] : [""],
		datasets: [
			{
				label: "Total Sales",
				data: Array.isArray(arr) ? [...arr] : [0],
				backgroundColor: [
					"#0241FF",
					"#000D33",
					"#4CAF50",
					"#FF9800",
					"#ED6665",
					"#79D2DE",
					"#666",
					"gray",
					"green",
					"lime",
					"maroon",
					"navy",
					"olive",
					"orange",
					"purple",
					"red",
					"silver",
					"teal",
				],
			},
		],
	};

	return <Doughnut data={data} options={options} height={200} />;
};

export default PieChart;
