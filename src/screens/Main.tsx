import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { productAxios } from "../api";

interface IProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { count: number; rate: number };
  title: string;
}

interface IInputs {
  id: number;
  category: string;
  title: string;
  price: number;
}

const Main = () => {
  const [allProduct, setAllProduct] = useState<IInputs[]>([]);
  const [inputs, setInputs] = useState<IInputs>({
    id: 0,
    category: "",
    title: "",
    price: 0,
  });

  const { id, category, title, price } = inputs;

  const isInitialMount = useRef(true);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const onSubmit = useCallback(() => {
    setAllProduct((prev) => [...prev, inputs]);
  }, [inputs]);

  const countProducts = (products: IInputs[]) => {
    console.log("Couting Products number...", products.length);
    return products.length;
  };

  const count = useMemo(() => countProducts(allProduct), [allProduct]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const fetchData = async () => {
        const allProduct = await productAxios.getAllProduct();
        let filteredProduct: IInputs[] = [];
        await allProduct.data.map((item: IProduct) => {
          return filteredProduct.push({
            id: item.id,
            category: item.category,
            title: item.title,
            price: item.price,
          });
        });
        setAllProduct(filteredProduct);
      };
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   console.log(inputs);
  // }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">no.</th>
            <th scope="col">Category</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {allProduct &&
            allProduct.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.category}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <input name="id" placeholder="id" onChange={onChange} value={id} />
        <input
          name="category"
          placeholder="category"
          onChange={onChange}
          value={category}
        />
        <input
          name="title"
          placeholder="title"
          onChange={onChange}
          value={title}
        />
        <input
          name="price"
          placeholder="price"
          onChange={onChange}
          value={price}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
      <h1>{count}</h1>
    </>
  );
};

export default Main;
