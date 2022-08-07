import React from 'react'
import { observer } from 'mobx-react-lite'
import { SimpleCell } from '@vkontakte/vkui'

const CategoryCell = observer(function CategoryCell({ category, selectCategory }) {
    return (
        <div>
            <SimpleCell
                onClick={() => selectCategory(category.id)}
                before={category.icon}
                description={category.description}
            >
                {category.title}
            </SimpleCell>
        </div>
    )
})

export default CategoryCell
