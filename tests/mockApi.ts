import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

function generateMockData() {
    const names = [
        'John', 'Bob', 'Jane', 'Mary', 'Eszter', 'Zoltan', 'Rob', 'Ned', 'Sarah', 'Charlie'
    ];

    const data: Array<Record<string, string>> = []

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++)
            data.push({
                id: (i + 1) + '' + (j + 1),
                name: names[j] + ' the ' + (i + 1),
                image: '/theimg.png',
                status: 'alive'
            });
    }

    return data;
}

const mockData = generateMockData();

export const mockApi = () => setupServer(
    graphql.query('getCharacters', ({ variables }) => {
        const data = variables.searchValue ? mockData.filter(x => x.name.includes(variables.searchValue)) : [...mockData];
        const recordsOnPage = 10;

        const startIndex = (variables.page - 1) * recordsOnPage;
        const endIndex = startIndex + recordsOnPage;

        const pageData = data.slice(startIndex, endIndex);
        const pages = Math.ceil(data.length / recordsOnPage)

        return HttpResponse.json({
            data: {
                characters: {
                    info: {
                        count: pageData.length,
                        pages: pages,
                    },
                    results: pageData
                },
            },
        })
    }),
    graphql.query('getCharacter', ({ variables }) => {
        const id = variables.id;
        const character = mockData.find(c => c.id === id);

        return HttpResponse.json({
            data: {
                character
            },
        })
    })
)
