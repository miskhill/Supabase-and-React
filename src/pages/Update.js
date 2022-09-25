import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [rating, setRating] = useState("");
    const [error, setError] = useState(null);
    //.eq passes in a couple of params that let us select the smoothie with the id that matches the id in the url
    //basically stands for equals.
    //.single method returns a single object instead of an array.
    //if I get an error then go back to the home page - replace:true to set this.
    useEffect(() => {
        const fetchSmoothie = async () => {
            const { data, error } = await supabase
                .from("smoothies")
                .select("*")
                .eq("id", id)
                .single();
            if (error) {
                console.log(error);
                navigate('/', {replace: true});
            }
            if(data){
                setTitle(data.title);
                setMethod(data.method);
                setRating(data.rating);
            }
        }
        fetchSmoothie();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !method || !rating) {
            setError("Please fill in all fields");
            return;
        }
        const { data, error } = await supabase
            .from("smoothies")
            .update({ title, method, rating })
            .eq("id", id);
        if (error) {
            setError(error.message);
            return;
        }
        if (data) {
            setError(null);
            navigate("/");
        }

    }

  return (
    <div className="page update">
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Smoothie Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label htmlFor="method">Method:</label>
            <textarea id="method" value={method} onChange={(e) => setMethod(e.target.value)}></textarea>

            <label htmlFor="rating">Rating:</label>
            <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}/>

            <button>Update Smoothie Recipe</button>

            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Update