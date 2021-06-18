export interface ListPlacholderProps<T> {
    id: string
    data: T[]
}

// Refactoring rule should replace this tag in the template by real list component instance
export function ListPlaceholder<T>(props: ListPlacholderProps<T>) {
    return ({props})
}

export interface DetailPlacholderProps<T> {
    id: string
    data: T
}

export function DetailPlaceholder<T>(props: ListPlacholderProps<T>) {
    return ({props})
}
