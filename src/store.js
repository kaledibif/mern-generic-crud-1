import create from 'zustand'

const useStore = create((set) => ({
    colors: [
        {
            HEX: '#FF2D55',
            color: 'Red Pink',
        },
        {
            HEX: '#5856D6',
            color: 'Warm Blue',
        },
        {
            HEX: '#FF9500',
            color: 'Dark Orange',
        },
        {
            HEX: '#FFCC00',
            color: 'Supernova',
        },
        {
            HEX: '#FF3B30',
            color: 'Red Orange',
        },
        {
            HEX: '#5AC8FA',
            color: 'Malibu',
        },
        {
            HEX: '#007AFF',
            color: 'Deep Sky Blue',
        },
        {
            HEX: '#4CD964',
            color: 'Fresh Green',
        },
    ],
    fieldTypes: [
        { fieldName: 'Metin', field: 'String' },
        { fieldName: 'Tarih', field: 'Date' },
        { fieldName: 'Sayı', field: 'Number' },
        { fieldName: 'E-mail', field: 'String' },
    ],
    isUpdated: false,
    toggleUpdate: () => set((state) => ({ isUpdated: !state.isUpdated })),
}))

export default useStore
