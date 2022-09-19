import supabase from "../config/supabaseClient";
import { useEffect, useState} from "react";
import SmoothieCard from "../components/smoothieCard";

const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [smoothies, setSmoothies] = useState(null);

    useEffect(() => {
      //fetch smoothies from supabase
        const fetchSmoothies = async () => {
            const { data, error } = await supabase
                .from("smoothies")
                .select("*")
                .order("id", { ascending: false });
            if (error) {
                setFetchError(error);
                setSmoothies(null);
                console.log(error);
            }
            setSmoothies(data);
            setFetchError(null);
        }
        fetchSmoothies();

    }, []);

  return (
    <div className="page home">
      <h2>Home</h2>
        {fetchError && <p>{fetchError},There was an error fetching the smoothies</p>}
        {smoothies && (
            <div className="smoothies">
                {/*order by buttons*/}
                <div className="smoothie-grid">
                {smoothies.map((smoothie) => (
                   <SmoothieCard key={smoothie.id} smoothie={smoothie} />
                ))}
                </div>
            </div>
        )}
    </div>
  )
}
export default Home