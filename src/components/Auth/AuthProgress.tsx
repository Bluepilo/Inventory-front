import React from "react";
import { ProgressStyle } from "../../styles/auth.styles";
import { FaCheck } from "react-icons/fa6";

const AuthProgress = ({ step }: { step: number }) => {
	return (
		<ProgressStyle>
			{step !== 1 ? (
				<div className="check">
					<FaCheck size={12} />
				</div>
			) : (
				<div className="round">
					<span />
				</div>
			)}
			<div className="line green" />
			{step === 1 ? (
				<div className="number">2</div>
			) : step === 2 ? (
				<div className="round">
					<span />
				</div>
			) : (
				<div className="check">
					<FaCheck size={12} />
				</div>
			)}
			<div className="line" />
			{step === 4 ? (
				<div className="check">
					<FaCheck size={12} />
				</div>
			) : step === 3 ? (
				<div className="round">
					<span />
				</div>
			) : (
				<div className="number">3</div>
			)}
		</ProgressStyle>
	);
};

export default AuthProgress;
