export const generatePaginationIndexes = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        const res = [];
        for (let i = 1; i <= totalPages; i++) {
            res.push(i);
        }
        return res;
    } else {
        if (currentPage <= 4) return [1, 2, 3, 4, 5, null, totalPages];
        if (currentPage >= totalPages - 3) return [1, null, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]

        return [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages]
    }
}