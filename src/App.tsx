import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";
import Routing from "./routing/Routing";

let persistor = persistStore(store);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routing />
			</PersistGate>
		</Provider>
	);
};

export default App;
