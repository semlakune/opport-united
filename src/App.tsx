import Hero from "@/components/Hero.tsx";
import Navbar from "@/components/Navbar.tsx";
import RunningLogo from "@/components/RunningLogo.tsx";

function App() {
  return (
    <main className={"min-h-screen"}>
      <Navbar />
      <Hero />
      <RunningLogo />
    </main>
  );
}

export default App;
