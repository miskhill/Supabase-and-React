import {useState} from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if all fields are not filled out
        //handle the error
        if(!title || !method || !rating){
            setError('Please fill in all fields')
            return
        }
        //if all fields are filled out
        //await supabase call to create smoothie
        //one object in the array in this case.
        //I would need to add .select() if i use v2 of supabase.
      const  { data, error } = await supabase
            .from('smoothies')
            .insert([{title, method, rating}])
        if(error){
            setError(error.message)
            return
        }
        if(data){
            //reset the form
            setTitle('')
            setMethod('')
            setRating(null)
            setError(null)
            //navigate to home page
            navigate('/')
        }
    }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
          <label htmlFor="title">Smoothie Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label htmlFor="method">Method:</label>
            <textarea id="method" value={method} onChange={(e) => setMethod(e.target.value)}></textarea>

            <label htmlFor="rating">Rating:</label>
            <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}/>

                <button>Create Smoothie Recipe</button>

          {error && <p className="error">{error}</p>}
          </form>
    </div>
  )
}

export default Create