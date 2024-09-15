import Stack from "@mui/joy/Stack";
import { PropsWithChildren } from "react";

export const Page = ({ children }: PropsWithChildren) => {
    return <Stack sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, overflowX: 'hidden' }}>{children}</Stack>
}