import React from "react";

export default function Paginated({ videogamesPerPage, allVideogames, paginado }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allVideogames.length / videogamesPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className="pagination">
            {pageNumbers &&
            pageNumbers.map((number) => (
                <div key={number}>
                    <button onClick={() => paginado(number)}>{number}</button>
                </div>
            ))}
        </nav>
    );
}