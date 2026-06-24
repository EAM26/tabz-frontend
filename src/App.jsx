import UserPage from "./components/UserPage.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
      <div  className="flex min-h-screen flex-col">
          <NavBar/>
          <main className="flex-1">
              <UserPage/>
          </main>
          <Footer/>
      </div>
  );
}

export default App;