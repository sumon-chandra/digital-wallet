import { Outlet } from "react-router";
import CommonLayout from "./layout/CommonLayout";

function App() {
  return (
    <CommonLayout>
      <main>
        <Outlet /> {/* Page content will render here */}
      </main>
    </CommonLayout>
  );
}

export default App;
