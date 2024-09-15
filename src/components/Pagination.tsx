import { ButtonGroup, Sheet } from "@mui/joy";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import { useMemo } from "react";
import { generatePaginationIndexes } from "./generatePaginationIndexes";

export interface PaginationProps {
    total: number;
    current: number;
    onPageChange: (next: number) => void
}

export const Pagination = ({ total, current, onPageChange }: PaginationProps) => {

    const numbers = useMemo(() => generatePaginationIndexes(current, total), [total, current])

    return <Sheet variant="soft" data-testid="pagination">
        <ButtonGroup variant="soft" sx={{ justifyContent: 'center' }}>
            <Button
                disabled={current === 1}
                color="neutral"
                onClick={() => onPageChange(current - 1)}>
                Prev
            </Button>
            {numbers.map((n, i) => <IconButton
                key={i}
                disabled={n === null}
                color={n === current ? 'primary' : 'neutral'}
                onClick={() => onPageChange(n!)}>
                {n === null ? '...' : n}
            </IconButton>)}
            <Button
                disabled={current === total}
                color="neutral"
                onClick={() => onPageChange(current + 1)}>
                Next
            </Button>
        </ButtonGroup>

    </Sheet>
}
