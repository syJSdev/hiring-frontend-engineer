import PayloadCard from 'components/PayloadCard';
import missionsJSON from 'dataset/missions.json';

function App() {
  return (
    <div className="m-10">
      <PayloadCard className="w-full md:w-2/3 lg:w-1/2" missions={missionsJSON.data.missions} />
    </div>
  );
}

export default App;
