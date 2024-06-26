import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram';

const products = [
    { id: 1, title: 'Куртка 1', price: 12000, description: 'Стиль!' },
    { id: 2, title: 'Куртка 2', price: 13000, description: 'Стиль2' },
    { id: 3, title: 'Куртка 3', price: 14000, description: 'Стиль3' },
    { id: 4, title: 'Куртка 4', price: 15000, description: 'Стиль4' },
    { id: 5, title: 'Джинсы 1', price: 1000, description: 'Стиль1' },
    { id: 6, title: 'Джинсы 2', price: 1200, description: 'Стиль2' },
    { id: 7, title: 'Джинсы 3', price: 1300, description: 'Стиль3' },
    { id: 8, title: 'Джинсы 4', price: 1400, description: 'Стиль4' },
];

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg } = useTelegram();

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];
        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Общая цена: ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => {
                return (
                    <ProductItem
                        product={item}
                        onAdd={onAdd}
                        className={'item'} />
                );
            })}
        </div>
    );
};

export default ProductList;