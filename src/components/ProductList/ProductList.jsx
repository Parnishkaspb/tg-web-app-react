import React, { useState, useCallback, useEffect } from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram';

const products = [
    { id: 1, title: 'Стрижка газона', price: 12000, description: 'Стиль!' },
    { id: 2, title: 'Строительство забора', price: 13000, description: 'Стиль2' },
    { id: 3, title: 'Ландшафтный дизайн', price: 14000, description: 'Стиль3' },
    { id: 4, title: 'Подсветка территории', price: 15000, description: 'Стиль4' },
    { id: 5, title: 'Строительство дома', price: 1000, description: 'Стиль1' },
    { id: 6, title: 'Осушение участка', price: 1200, description: 'Стиль2' },
];

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg, queryId } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('https://45.89.188.119:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems, queryId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])


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
            <h1>Закажите услугу у проверенных партнеров нашего поселка</h1>
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