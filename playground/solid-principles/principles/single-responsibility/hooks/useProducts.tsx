import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: () =>
            fetch('https://fakestoreapi.com/products').then(res =>
                res.json()
            )
    });

    return { loading: isLoading, error, data };
};

export default useProducts;