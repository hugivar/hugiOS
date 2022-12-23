import { useMemo, useState } from "react";
import { Rating } from "react-simple-star-rating";
import Product from "./product";
import useProducts from './hooks/useProducts';

function Good() {
    const [filterRate, setFilterRate] = useState(1);
    const { data } = useProducts();

    const handleRating = (rate: number) => {
        setFilterRate(rate);
    };

    const filteredProducts = useMemo(
        () =>
            data?.filter(
                (product: any) => product.rating.rate > filterRate
            ),
        [data, filterRate]
    );

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col justify-center items-center">
                <span className="font-semibold">Minimum Rating </span>
                <Rating
                    initialValue={filterRate}
                    SVGclassName="inline-block"
                    onClick={handleRating}
                />
            </div>
            <div className="h-full flex flex-wrap justify-center">
                {filteredProducts?.map((product: any) => (
                    <Product title={product.title} price={product.price} image={product.image} rating={product.rating} />
                ))}
            </div>
        </div>
    );
}

export default Good;