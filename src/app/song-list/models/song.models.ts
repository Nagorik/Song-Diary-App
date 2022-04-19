export interface Song {
    id: number,
    name: string
}
export interface SongState {
    songs: Song[]
}

export const initState = { songs: [] };