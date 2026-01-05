import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProducts } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import { FixedSizeGrid as Grid } from 'react-window';

import ProductFilters from "../components/ProductFilters";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductPage = () => {
    const dispatch = useDispatch();
    const { list: products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
    }, [dispatch, keyword, currentPage, price, category, ratings]);

    const handleSearch = (term) => {
        setKeyword(term);
        setCurrentPage(1);
    };

    const handleCategory = (cat) => {
        setCategory(cat);
        setCurrentPage(1);
    };

    return (
        <div>
            <h1>Our Products</h1>

            <SearchBar onSearch={handleSearch} />

            <div>
                <div>
                    <div>
                        <ProductFilters
                            price={price}
                            setPrice={setPrice}
                            category={category}
                            setCategory={handleCategory}
                            ratings={ratings}
                            setRatings={setRatings}
                        />
                    </div>
                </div>

                <div>
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <div role="alert">
                            <strong>Error: </strong>
                            <span>{error}</span>
                        </div>
                    ) : (
                        <>
                            <div style={{ height: "600px", width: "100%" }}>
                                {(() => {
                                    if (!products || products.length === 0) {
                                        return <div>No products to display</div>;
                                    }

                                    const columnCount = 4;
                                    const columnWidth = Math.floor((typeof window !== 'undefined' ? window.innerWidth : 1200) * 0.95 / columnCount);
                                    const rowHeight = 400;
                                    const rowCount = Math.ceil(products.length / columnCount);

                                    return (
                                        <Grid
                                            columnCount={columnCount}
                                            columnWidth={columnWidth}
                                            height={600}
                                            rowCount={rowCount}
                                            rowHeight={rowHeight}
                                            width={typeof window !== 'undefined' ? window.innerWidth * 0.95 : 1200}
                                            itemData={{ products, columnCount }}
                                        >
                                            {({ columnIndex, rowIndex, style, data }) => {
                                                const product = data.products[rowIndex * data.columnCount + columnIndex];
                                                if (!product) return null;
                                                return (
                                                    <div style={{ ...style, padding: '10px' }}>
                                                        <ProductCard product={product} />
                                                    </div>
                                                );
                                            }}
                                        </Grid>
                                    );
                                })()}
                            </div>

                            {resultPerPage < productsCount && (
                                <Pagination
                                    resultPerPage={resultPerPage}
                                    totalPosts={productsCount}
                                    paginate={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProductPage;