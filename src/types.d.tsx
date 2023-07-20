export interface Podcasts {
    feed: Feed
}

export interface Feed {
    author: Author
    entry: Entry[]
    updated: { label: string }
    rights: { label: string }
    title: { label: string }
    icon: { label: string }
    link: Link2[]
    id: { label: string }
}

export interface Author {
    name: string
    uri: string
}

export interface Link2 {
    attributes: {
        rel: string
        type?: string
        href: string
    }

}

export interface Entry {
    "im:name": string
    "im:image": ImImage[]
    summary: string
    "im:price": ImPrice
    "im:contentType": ImContentType
    rights?: string
    title: string
    link: Link
    id: Id
    "im:artist": ImArtist
    category: Category
    "im:releaseDate": ImReleaseDate
}

export interface Link {
    attributes: {
        rel: string
        type: string
        href: string
    }
}

export interface ImReleaseDate {
    label: string
    attributes: { label: string }
}

export interface Category {
    attributes: {
        "im:id": string
        term: string
        scheme: string
        label: string
    }
}


export interface ImArtist {
    label: string
    attributes?: { href: string }
}

export interface Id {
    attributes: {
        "im:id": string
    }
}

export interface ImContentType {
    attributes: {
        term: string
        label: string
    }
}

export interface ImImage {
    label: string
    attributes: { height: string }
}

export interface ImPrice {
    label: string
    attributes: {
        amount: string
        currency: string
    }
}