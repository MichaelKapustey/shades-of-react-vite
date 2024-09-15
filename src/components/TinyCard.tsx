import { Card, Stack, SvgIcon, Typography } from "@mui/joy";
import { ReactNode } from "react"

export interface TinyCardProps {
    icon: ReactNode;
    title?: string;
    content?: string | null;
}

export const TinyCard = ({ icon, title, content }: TinyCardProps) => <Card invertedColors variant="soft" color="primary">
    <Stack direction="row" spacing={1}>
        <SvgIcon sx={{ fontSize: '52px' }}>
            {icon}
        </SvgIcon>
        <Stack>
            <Typography level="body-md" fontWeight="600" >{title}</Typography>
            <Typography level="body-lg">{content}</Typography>
        </Stack>
    </Stack>
</Card>