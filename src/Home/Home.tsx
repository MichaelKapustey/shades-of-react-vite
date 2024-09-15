import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import request from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../gql/gql';
import { useState } from 'react';
import { Pagination } from '../components/Pagination';
import { Link } from 'react-router-dom';
import { Page } from '../components/Page';

const allCharacters = graphql(/* GraphQL */ `
query getCharacters($searchValue: String!, $page: Int!){
  characters(page: $page, filter:{name: $searchValue }){
    info{
      count,
      pages
  },
    results{
      id,
      name,
      status,
      species,
      image
    }
  }
}
`);

export const Home = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ['characters', search, page],
    queryFn: async ({ queryKey }) =>
      request(
        'https://rickandmortyapi.com/graphql',
        allCharacters,
        { searchValue: queryKey[1] as string, page: queryKey[2] as number }
      ).catch(err => {
        console.error(err);
        return;
      }),
    placeholderData: (prev) => prev,
  })

  return <Page>
    <Typography level='h1' variant='solid' color='primary' textAlign="center">
      Characters
    </Typography>
    <Input
      placeholder='Type to search'
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}>
    </Input>
    <Sheet sx={{ overflowY: 'auto', mb: 'auto' }}>
      <Table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Species</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody data-testid="characters-table-body">
          {data?.characters?.results?.map((row) => (
            <tr key={row?.id}>
              <td><Avatar src={row?.image ?? ''} alt={row?.name ?? ''} /></td>
              <td><Typography
                variant='plain'
                level='body-sm'
                sx={{ textDecoration: 'none' }}
                component={Link}
                to={`/${row?.id}`}>
                {row?.name}
              </Typography>
              </td>
              <td><Typography variant='plain' level='body-sm'>{row?.species}</Typography></td>
              <td><Typography variant='plain' level='body-sm'>{row?.status}</Typography></td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Sheet >
    <Pagination current={page} total={data?.characters?.info?.pages || 0} onPageChange={(p) => setPage(p)} />
  </Page >

}