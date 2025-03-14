import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import basicService from "./basic-service";
import { displayError } from "../../../utils/errors";
import { notificationType } from "../../../utils/types";
import { userProfile } from "../auth/auth-slice";
import { OptionProp } from "../../../components/Filters/BasicInputs";
import productService from "../product/product-service";

const initialState = {
	theme: "light",
	notify: notificationType,
	dashboardStats: {} as any,
	shops: [] as OptionProp[],
	methods: [] as OptionProp[],
	staffs: [] as OptionProp[],
	states: [] as OptionProp[],
	settings: {} as any,
	expenseCat: [] as OptionProp[],
	brands: [] as any,
	countries: [] as OptionProp[],
	logTypes: [] as OptionProp[],
	organization: {} as any,
	carousels: [] as any,
	pictureMode: false,
};

export const changeTheme = createAsyncThunk(
	"basic/theme",
	async (data: string, thunkAPI) => {
		try {
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const changePictureMode = createAsyncThunk(
	"basic/picMode",
	async (data: boolean) => {
		try {
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const updateOnboardingSteps = createAsyncThunk(
	"basic/onboardingSteps",
	async (data: any, thunkAPI: any) => {
		try {
			const res = await basicService.updateOnboardingSteps(data);
			await thunkAPI.dispatch(userProfile());
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getNotifications = createAsyncThunk(
	"basic/notification",
	async (page: number, thunkAPI: any) => {
		try {
			const res = await basicService.getNotifications(page);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getDashboardStats = createAsyncThunk(
	"basic/dashStats",
	async (data: any, thunkAPI: any) => {
		try {
			const res = await basicService.dashboardStats(
				data.year,
				data.period
			);
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const allShops = createAsyncThunk(
	"basic/shops",
	async (_, thunkAPI: any) => {
		try {
			const res = await basicService.allShops("?all=true");
			let arr = res.data?.map((f: any) => {
				return { value: f.id, label: f.name, isActive: f.isActive };
			});
			return arr;
		} catch (error) {}
	}
);

export const allStaffs = createAsyncThunk(
	"basic/staffs",
	async (_, thunkAPI: any) => {
		try {
			const res = await basicService.allStaffs("?all=true");
			let arr = res.data?.map((f: any) => {
				return { value: f.id, label: f.fullName, id: f.shopId };
			});
			return arr;
		} catch (error) {}
	}
);

export const getSettings = createAsyncThunk(
	"basic/settings",
	async (_, thunkAPI: any) => {
		try {
			const res = await basicService.saveSettings();
			return res.data;
		} catch (error) {}
	}
);

export const paymentMethods = createAsyncThunk(
	"basic/paymentMethod",
	async (_, thunkAPI: any) => {
		try {
			const res = await basicService.paymentMethods();
			let arr = res.data?.map((f: any) => {
				return { value: f.id, label: f.name };
			});
			return arr;
		} catch (error) {}
	}
);

export const getAllCountries = createAsyncThunk(
	"basic/countries",
	async (_) => {
		try {
			const res = await basicService.getCountries();
			let arr = res.data?.map((f: any) => {
				return { ...f, value: f.iso, label: f.name };
			});
			return arr;
		} catch (error) {}
	}
);

export const getStates = createAsyncThunk("basic/states", async (_) => {
	try {
		const res = await basicService.getStates();
		let arr = res.data?.map((f: any) => {
			return { ...f, value: f.id, label: f.name };
		});
		return arr;
	} catch (error) {}
});

export const getExpenseCategories = createAsyncThunk(
	"basic/expenseCats",
	async (_, thunkAPI: any) => {
		try {
			const res = await basicService.getExpenseCategories();
			let arr = res.data?.map((f: any) => {
				return { ...f, value: f.id, label: f.name };
			});
			return arr;
		} catch (error) {}
	}
);

export const getManagedBrands = createAsyncThunk(
	"basic/managedBrands",
	async (_, thunkAPI: any) => {
		try {
			const res = await productService.managedBrands();
			return res;
		} catch (error) {}
	}
);

export const getLogTypes = createAsyncThunk(
	"basic/logTypes",
	async (_, thunkAPI: any) => {
		try {
			const res = await productService.getLogTypes();
			let arr = res?.map((f: any) => {
				return { ...f, value: f.id, label: f.name };
			});
			return arr;
		} catch (error) {}
	}
);

export const getOrganizationReport = createAsyncThunk(
	"basic/organization",
	async (_, thunkAPI: any) => {
		try {
			const res = await basicService.organizationReports();
			return res;
		} catch (error) {}
	}
);

export const getCarousels = createAsyncThunk("basic/carousels", async () => {
	try {
		const res = await basicService.allCarousels();
		return res;
	} catch (error) {}
});

export const basicSlice = createSlice({
	name: "basic",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(changeTheme.fulfilled, (state, action) => {
			state.theme = action.payload || "light";
		});
		builder.addCase(changePictureMode.fulfilled, (state, action) => {
			state.pictureMode = action.payload || false;
		});
		builder.addCase(getNotifications.fulfilled, (state, action) => {
			state.notify = action.payload;
		});
		builder.addCase(getDashboardStats.fulfilled, (state, action) => {
			state.dashboardStats = action.payload;
		});
		builder.addCase(allShops.fulfilled, (state, action) => {
			state.shops = action.payload || [];
		});
		builder.addCase(allStaffs.fulfilled, (state, action) => {
			state.staffs = action.payload || [];
		});
		builder.addCase(getSettings.fulfilled, (state, action) => {
			state.settings = action.payload;
		});
		builder.addCase(paymentMethods.fulfilled, (state, action) => {
			state.methods = action.payload || [];
		});
		builder.addCase(getAllCountries.fulfilled, (state, action) => {
			state.countries = action.payload || [];
		});
		builder.addCase(getStates.fulfilled, (state, action) => {
			state.states = action.payload || [];
		});
		builder.addCase(getExpenseCategories.fulfilled, (state, action) => {
			state.expenseCat = action.payload || [];
		});
		builder.addCase(getManagedBrands.fulfilled, (state, action) => {
			state.brands = action.payload || [];
		});
		builder.addCase(getLogTypes.fulfilled, (state, action) => {
			state.logTypes = action.payload || [];
		});
		builder.addCase(getOrganizationReport.fulfilled, (state, action) => {
			state.organization = action.payload || {};
		});
		builder.addCase(getCarousels.fulfilled, (state, action) => {
			state.carousels = action.payload || [];
		});
	},
});

export default basicSlice.reducer;
