import "./App.css";
import Profilepage from "./component/Profilepage";
import { ThemeProvider } from "./providers/ThemeProvider";
import { UserProvider } from "./providers/UserProvider";

function App() {
  return (
    <>
      <UserProvider>
        <ThemeProvider>
          <Profilepage />
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
