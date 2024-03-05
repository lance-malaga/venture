import { useState } from 'react';
import Link from 'next/link';

const MapFilter = () => {
    const [currentPage, setCurrentPage] = useState("avg-rent");

    const handleLinkClick = (page: string) => {
        setCurrentPage(page);
    };

    return (
        <div className='flex flex-row gap-5' style={{ marginLeft: "13%" }}>
            <p>FILTER BY:</p>
            <div className='flex flex-row gap-1'>
                <Link href={'/map/avg-rent'} legacyBehavior>
                    <a onClick={() => handleLinkClick("avg-rent")} style={{ color: currentPage === "avg-rent" ? "#364EC0" : "inherit", fontWeight: currentPage === "avg-rent" ? "bold" : "normal" }}>AVG. RENT</a>
                </Link>
                <p>/</p>
                <Link href={'/map/density'} legacyBehavior>
                    <a onClick={() => handleLinkClick("density")} style={{ color: currentPage === "density" ? "#C73E1D" : "inherit", fontWeight: currentPage === "density" ? "bold" : "normal" }}>DENSITY</a>
                </Link>
                <p>/</p>
                <Link href={'/map/parks'} legacyBehavior>
                    <a onClick={() => handleLinkClick("parks")} style={{ color: currentPage === "parks" ? "#008E6F" : "inherit", fontWeight: currentPage === "parks" ? "bold" : "normal" }}>PARKS</a>
                </Link>
            </div>
        </div>
    );
};

export default MapFilter;
