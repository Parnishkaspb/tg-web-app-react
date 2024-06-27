import React from 'react';
import './CarNumberItem.css';
import Button from '../Button/Button';
const CarNumberItem = ({ numberTemplate, className, onAdd, onDel }) => {
    const onAddHandler = () => {
        onAdd(numberTemplate);
    }

    const onDelHandler = () => {
        onDel(numberTemplate);
    }
    return (
        <div className={'numbers ' + className}>
            <div className={'number'}>{numberTemplate.number}</div>
            <div className={'timeToEnd'}>
                <span>
                    Срок использование: <b>
                        {numberTemplate.datetime === 0 ? 'Бессрочно' : numberTemplate.datetime}
                    </b>
                </span>

            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Редактировать
            </Button>
            <Button className={'add-btn'} onClick={onDelHandler}>
                Удалить
            </Button>
        </div>
    );
};

export default CarNumberItem;