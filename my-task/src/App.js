import { Provider } from "react-redux";
import { store } from "./redux/tableData/store";

import Home from "./components/home/home";

function App() {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
