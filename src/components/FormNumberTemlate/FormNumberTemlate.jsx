import React, { useCallback, useEffect, useState } from 'react';
import './FormNumberTemlate.css';
import { useTelegram } from '../../hooks/useTelegram';

const FormNumberTemplate = () => {
    const [number, setNumber] = useState('');
    const [timeToEnd, setTimeToEnd] = useState(false);
    const [dateTime, setDateTime] = useState('');
    const [subject, setSubject] = useState('car');
    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            number,
            timeToEnd: timeToEnd ? 'Бессрочно' : dateTime,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [number, timeToEnd, dateTime, subject, tg]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        });
    }, [tg]);

    useEffect(() => {
        if (!number || (!timeToEnd && !dateTime)) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [number, timeToEnd, dateTime, tg]);

    const onChangeNumber = (e) => {
        setNumber(e.target.value);
    }

    const onChangeTimeToEnd = (e) => {
        setTimeToEnd(e.target.checked);
    }

    const onChangeDateTime = (e) => {
        setDateTime(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className={'form'}>
            <h3>Выписать пропуск</h3>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'car'}>Автомобиль</option>
                <option value={'moto'}>Мотоцикл</option>
            </select>
            <input
                className={'input'}
                type='text'
                placeholder={'Номер ТС'}
                value={number}
                onChange={onChangeNumber}
            />
            <label>
                <input
                    className={'input'}
                    type='checkbox'
                    checked={timeToEnd}
                    onChange={onChangeTimeToEnd}
                />
                Бессрочно
            </label>
            {!timeToEnd && (
                <input
                    className={'input'}
                    type='datetime-local'
                    value={dateTime}
                    onChange={onChangeDateTime}
                />
            )}
        </div>
    );
};

export default FormNumberTemplate;
