import { Button } from "@nativeweather/ui";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Button onPress={() => console.log("Greet")} className="bg-emerald-600">
        Greet
      </Button>
    </main>
  );
}

export default App;
