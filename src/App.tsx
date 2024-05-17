import { UserState } from "./context/authContext/authContext";
import LayoutProvider from "./context/layoutContext/layout.context";
import Routing from "./routing/route";
import "./styles/app.scss";

function App() {
  const {token} = UserState()
  return (
    <LayoutProvider token={token}>
      <Routing />
    </LayoutProvider>
  );
}

export default App;