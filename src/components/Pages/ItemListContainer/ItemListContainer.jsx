import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { gFetch } from "../../../../helpers/gFetch";

const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryID } = useParams();
  console.log(categoryID);

  useEffect(() => {
    if (categoryID) {
      gFetch() // simulacion de fetch -> mock
        .then((res) =>
          setProductos(res.filter((prod) => prod.category === categoryID))
        )
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      gFetch() // simulacion de fetch -> mock
        .then((res) => setProductos(res))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [categoryID]);

  //console.log(productos);
  return (
    <>
      <h1 className="py-5 text-center text-3xl font-semibold">{greeting}</h1>
      <div className="mx-auto grid w-2/3 grid-cols-1 gap-x-5 md:grid-cols-2 lg:grid-cols-3 sm:bg-gray-700 rounded-box">
        {loading ? (
          <button className="btn loading col-span-3 border-none bg-inherit">
            Cargando
          </button>
        ) : (
          productos.map((prod) => (
            <div key={prod.id} className="sm:m-6">
              <div className="card-compact card w-60 bg-slate-900 shadow-xl hover:scale-105 transition-transform">
                <Link to={`/detail/${prod.id}`}>
                  <figure>
                    <img src={prod.image} />
                  </figure>
                  <div className="card-body flex flex-row justify-between">
                    <h2 className="card-title">{prod.name}<span className="badge badge-sm border-none bg-slate-700 text-white uppercase">{prod.category}</span></h2>
                  </div>
                  <div className="px-4 text-sm flex flex-row justify-between truncate">
                    {prod.description}
                  </div>
                  <div className="card-body flex flex-col justify-between">
                    <p className="flex justify-between">
                      <span className="pt-1 px-2 bg-slate-600 rounded-lg font-semibold">Ver más</span>
                      <span className="p-1 bg-slate-600 rounded-lg font-semibold">${prod.price}</span>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ItemListContainer;
