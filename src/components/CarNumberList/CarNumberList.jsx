import React, { useState, useCallback, useEffect } from 'react';
import './CarNumberList.css';
import CarNumberItem from '../CarNumberItem/CarNumberItem';
import { useTelegram } from '../../hooks/useTelegram';

const numberTemplates = [
    { id: 1, number: 'o000oo00', type: 1, datetime: 0 },
    { id: 2, number: 'o001oo00', type: 1, datetime: 0 },
    { id: 3, number: 'o001oo99', type: 1, datetime: '2024-06-29 12:00' },
    { id: 4, number: '0001oo01', type: 2, datetime: '2024-06-29 12:00' },
    { id: 5, number: '0000oo00', type: 2, datetime: 0 },
];


const CarNumberList = () => {

    return (
        <div className={'list'}>
            {numberTemplates.map(item => {
                return (
                    <CarNumberItem
                        numberTemplate={item}
                        onAdd={onAdd}
                        onDel={onDel}
                        className={'item'} />
                );
            })}
        </div>
    );
};

export default CarNumberList;