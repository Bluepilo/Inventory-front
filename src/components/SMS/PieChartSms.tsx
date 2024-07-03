import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DashboardCard } from "../../styles/home.styles";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartSms = ({ report }: { report: any }) => {
	const arr: any = report?.map((l: any) => {
		return l.count;
	});

	const labels: any = report?.map((l: any) => {
		return l._id;
	});

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: `bottom` as const,
			},
		},
	};

	const data = {
		labels: Array.isArray(labels) ? [...labels] : [""],
		datasets: [
			{
				label: "Total Sales",
				data: Array.isArray(arr) ? [...arr] : [0],
				backgroundColor: ["#4CAF50", "#FF9800", "#ED6665", "#79D2DE"],
			},
		],
	};

	return (
		<DashboardCard>
			<div className="head">
				<h6>SMS Performance</h6>
			</div>
			<div className="body">
				<Doughnut
					data={data}
					options={options}
					height={200}
					width={400}
				/>
			</div>
		</DashboardCard>
	);
};

export default PieChartSms;
