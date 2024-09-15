import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { graphql } from "../gql/gql";
import request from "graphql-request";
import Typography from "@mui/joy/Typography";
import Card from '@mui/joy/Card';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import DeadIcon from '@mui/icons-material/NoAccounts';
import AliveIcon from '@mui/icons-material/AccountCircleRounded';
import UnknownIcon from '@mui/icons-material/HelpRounded';
import CardCover from "@mui/joy/CardCover";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import { TinyCard } from "../components/TinyCard";
import { Page } from "../components/Page";
import { Img } from "react-image";

const character = graphql(/* GraphQL */ `
query getCharacter($id:ID!){
  character(id:$id){
    name,
    image,
    origin{
      name
    },
    status,
    species,
    type,
    location{
      name
    }
    episode{
      id
      name
    }
  }
}
`);

export const Profile = () => {
    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ['character', id],
        queryFn: async ({ queryKey }) =>
            request(
                'https://rickandmortyapi.com/graphql',
                character,
                { id: queryKey[1] as string }
            ).catch(err => {
                console.error(err);
                return;
            }),
        placeholderData: (prev) => prev
    })
    return <Page>
        <Typography level='h1'
            variant='solid'
            color='primary'
            textAlign='center'
            startDecorator={<IconButton size="lg" color="primary" variant="solid" sx={{ ml: 2 }} component={Link} to="/">
                <ArrowBackIosNewRoundedIcon />
            </IconButton>}>
            Profile
        </Typography>
        <Stack sx={{ overflowY: 'auto' }}>
            <Stack spacing={2} direction="row" flexWrap="wrap" useFlexGap sx={{ p: 2 }}>
                <Card sx={{ height: 300, width: 300 }} variant="soft" color="primary">
                    <CardCover>
                        <Img src={data?.character?.image || ''} alt={data?.character?.name || ''} />
                    </CardCover>
                </Card>

                <Stack spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 'auto', mb: 'auto' }}>
                    <Typography level="h2">{data?.character?.name}</Typography>
                    <Typography level="title-lg">{data?.character?.type || data?.character?.species}</Typography>
                    <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
                        <TinyCard icon={<LocationOnRoundedIcon />}
                            title="Last known location:"
                            content={data?.character?.location?.name}
                        />
                        <TinyCard icon={<LocationCityRoundedIcon />}
                            title="Origin:"
                            content={data?.character?.origin?.name}
                        />
                        <TinyCard icon={
                            data?.character?.status === 'Alive'
                                ? <AliveIcon />
                                : data?.character?.status === 'Dead'
                                    ? <DeadIcon />
                                    : <UnknownIcon />}
                            title="Status:"
                            content={data?.character?.status}
                        />
                    </Stack>
                </Stack>
            </Stack>
            <Stack sx={{ p: 2 }}  >
                <Typography level="title-lg">Episodes:</Typography>
                <Typography>
                    {(data?.character?.episode || []).map(e => e?.name).join(', ')}
                </Typography>
            </Stack>
        </Stack>
    </Page >
}