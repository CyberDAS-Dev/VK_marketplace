const categoryDict = (category) => {
    switch (category) {
        case 'all':
            return 'Все объявления'
        case 'misc':
            return 'Бытовые товары'
        case 'food':
            return 'Еда'
        case 'clothes':
            return 'Одежда'
        case 'books':
            return 'Книги'
        case 'electronics':
            return 'Электроника'
        case 'household':
            return 'Бытовая техника'
        case 'furniture':
            return 'Мебель'
        default:
            return 'Любая'
    }
}

export default categoryDict
