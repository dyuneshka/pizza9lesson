import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const Fullpizza: React.FC = () => {
  const [pizza, Setpizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
    const navigate = useNavigate()

  React.useEffect(() => {
    async function Fetchpizza() {
      try {
        const { data } = await axios.get(
          "https://66f883262a683ce9730fa040.mockapi.io/items/" + id
        );
        Setpizza(data);
      } catch (error) {
        alert("Error pizzas....");
        navigate('/')
      }
    }

    Fetchpizza()

  }, []);


  if (!pizza){
    return <>Loading...</>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="1" />
      <h1>{pizza.title}</h1>
      <span>{pizza.price}</span>
    </div>
  );
};

export default Fullpizza;
