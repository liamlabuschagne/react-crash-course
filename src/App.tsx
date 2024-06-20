const App = () => {
  const name = "Liam";
  const x = 10;
  const y = 20;
  return (
    <>
      <div className="text-5xl">App</div>
      <p>Hello {name}</p>
      <p>
        The sum of {x} and {y} is {x + y}
      </p>
    </>
  );
};
export default App;
