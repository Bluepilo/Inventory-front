import styled from "styled-components";

export const TrialBox = styled.div`
	padding: 20px;

	h5 {
		text-align: center;
		font-weight: 600;
		margin-bottom: 25px;
	}

	button {
		border: 0;
		outline: 0;
		padding: 8px 30px;
		font-weight: 600;
		border: 1px solid rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		margin-top: 10px;

		&.active {
			background: #0241ff;
			color: #fff;
			border: 0;
			margin-bottom: 10px;
		}
	}

	.cancels {
		text-align: center;
		color: red;
		width: 100%;
		display: block;
		margin-top: 20px;
		text-decoration: underline;
		font-weight: bold;
	}

	.pick {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&.bord {
			border-top: 1px solid #d9dbe9;
			padding-top: 10px;
		}

		h6 {
			color: #0241ff;
			font-weight: 600;
			font-size: 1.1rem;
		}

		div {
			width: 80%;
		}
	}
`;

export const OnboardingStyles = styled.div`
	.head {
		margin-bottom: 25px;
		p {
			padding: 0;
			margin: 0;
			font-size: 0.85rem;
		}
		h5 {
			font-weight: 600;
			font-size: 1.3rem;
			span {
				color: #0241ff;
			}
		}
	}
	.steps {
		.step {
			margin-bottom: 20px;
			padding: 15px 25px;
			border-radius: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #edeef0;

			svg {
				font-size: 3rem;
				margin-right: 10px;
			}

			&.active {
				border: 1px solid #00b52a;
				background: #fff;

				img.icon {
					filter: invert(51%) sepia(65%) saturate(5524%)
						hue-rotate(113deg) brightness(103%) contrast(101%);
				}

				h6 {
					a {
						color: #00b52a !important;
					}
				}
			}

			.first {
				align-items: center;
				display: flex;
				width: 85%;

				div {
					margin-left: 20px;
				}

				span {
					width: 50px;
					height: 50px;
					padding: 10px 20px;
					justify-content: center;
					align-items: center;
					gap: 20px;
					border: 1px solid #505bda;
					border-radius: 50%;
					color: #0241ff;
					font-weight: bold;
				}

				h6 {
					font-weight: 600;

					a {
						color: #0241ff;
						text-decoration: none;

						&:hover {
							text-decoration: underline;
						}
					}
				}
				p {
					font-size: 0.9rem;
					padding: 0;
					margin: 0;
				}
			}
		}
	}
`;

export const HelpBox = styled.div`
	border: 1px solid #000d33;
	border-radius: 20px;

	.up {
		background: #c3c7dd;
		padding: 30px;
		border-radius: 20px 20px 0 0;

		h5 {
			width: 50%;
			font-weight: 700;
			margin: 0;
			margin-top: 20px;
		}
	}

	.down {
		.first {
			padding: 30px;

			&.bord {
				border-top: 1px solid #000d33;
			}
		}

		p {
			font-size: 0.9rem;
			font-weight: 700;

			span {
				color: #0241ff;
			}
		}
	}
`;

export const DashboardCard = styled.div`
	background: #f5f5f5;
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
	padding: 20px;
	border-radius: 10px;
	height: 100%;

	h5 {
		font-weight: 600;
	}

	.head {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #d9dbeb;
		padding-bottom: 10px;
		margin-bottom: 10px;

		h6 {
			margin: 0;
			padding: 0;
			font-weight: 600;
		}

		span {
			color: #000d35;
			margin-left: 10px;
			display: flex;
			padding: 4px 10px;
			justify-content: center;
			align-items: center;
			gap: 10px;
			background: #ffb900;
			border-radius: 50px;
			font-size: 0.8rem;
			font-weight: bold;
		}
	}

	.body {
		.content {
			h6 {
				font-size: 0.8rem;
			}
			h4 {
				font-size: 1.2rem;
				font-weight: 600;
			}
		}
	}
`;

export const ProgressCard = styled.div`
	border: 1px solid #d9dbeb;
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
	padding: 5px 10px;
	border-radius: 3px;

	div.box {
		font-weight: 600;
		font-size: 0.9rem;
		svg,
		img {
			margin-right: 10px;
		}
	}
	.prog {
		background: #ccc;
		height: 5px;
		width: 100%;
		margin-top: 10px;

		.tracks {
			background: #0241ff;
			height: 100%;
		}
	}
`;
