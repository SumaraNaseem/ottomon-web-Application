"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductCardsale from './ProductCardsale';

const ProductListSale = ({ selectedGrid, setSelectedGrid, pageType, CallingFrom }) => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(0);
    const [mattresses, setMattresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMattresses = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://ottomonukbackup1.vercel.app/sales");
                const filters = {
                    DivanBeds: 'Divan Beds',
                    DivanBasesOnly: 'Divan Bases Only',
                    BedFrames: 'Bed Frames',
                    Mattresses: 'Mattresses',
                    Headboards: 'Headboards',
                    Furniture: 'Furniture',
                    AllSales: 'All Sales',
                    ClearanceBundles: 'Clearance Bundles'
                };

                const filteredData = response.data.salesData.filter(
                    (value) => value.type === filters[CallingFrom]
                );
                setMattresses(filteredData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMattresses();
    }, [CallingFrom]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const currentItems = mattresses.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const pageCount = Math.ceil(mattresses.length / itemsPerPage);

    return (
        <div>
            <section id="Projects"
                className={` ${selectedGrid === 2 ? "custom-grid" : "grid grid-cols-" + selectedGrid} ${selectedGrid !== 0 ? 'justify-items-center justify-center gap-6 ' : ''}mt-10 mb-5 `}>
                <ProductCardsale 
                    items={currentItems}
                    selectedGrid={selectedGrid}
                    pageType={pageType}
                    CallingFrom={CallingFrom}
                    loading={loading}
                />
            </section>
            <hr className='text-primary' />
            <div className='flex justify-center mt-3'>
                <ReactPaginate
                    pageLinkClassName='text-primary'
                    activeClassName='text-red-400'
                    activeLinkClassName='text-red-400'
                    nextLinkClassName='text-primary'
                    previousClassName='text-primary'
                    className='flex gap-5'
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}

export default ProductListSale;
