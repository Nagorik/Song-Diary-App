export interface Artist {
    id: number,
    name: string
}

export interface ArtistState {
    artists: Artist[]
}

export const initState = { artists: [] }