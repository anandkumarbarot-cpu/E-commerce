import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProducts } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

import { FixedSizeGrid as Grid } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';

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
                                <AutoSizer>
                                    {({ height, width }) => {
                                        const columnCount = 3;
                                        const columnWidth = width / columnCount;
                                        const rowHeight = 450;
                                        const rowCount = Math.ceil(products.length / columnCount);

                                        return (
                                            <Grid
                                                columnCount={columnCount}
                                                columnWidth={columnWidth}
                                                height={height}
                                                rowCount={rowCount}
                                                rowHeight={rowHeight}
                                                width={width}
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
                                    }}
                                </AutoSizer>
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