import React, { useCallback, useEffect, useState } from 'react';
import './FormNumberTemlate.css';
import { useTelegram } from '../../hooks/useTelegram';
import InputMask from 'react-input-mask';

const FormNumberTemlate = () => {
    const { tg } = useTelegram();
    const [number, setNumber] = useState('');
    const [timeToEnd, setTimeToEnd] = useState(false);
    const [dateTime, setDateTime] = useState('');
    const [subject, setSubject] = useState(1);

    const what = 'new_templates';

    const onSendData = useCallback(() => {
        const data = {
            number,
            timeToEnd: timeToEnd ? 0 : dateTime,
            subject,
            what
        };
        tg.sendData(JSON.stringify(data));
    }, [number, timeToEnd, dateTime, subject, what]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        });
    }, []);

    useEffect(() => {
        if (!number || (!timeToEnd && !dateTime)) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [number, timeToEnd, dateTime]);

    const onChangeNumber = (e) => {
        setNumber(e.target.value);
    };

    const onChangeTimeToEnd = (e) => {
        setTimeToEnd(e.target.checked);
    };

    const onChangeDateTime = (e) => {
        setDateTime(e.target.value);
    };

    const onChangeSubject = (e) => {
        setSubject(Number(e.target.value));
    };

    const maskDefinitions = {
        'a': {
            validator: /[АВЕКМНОРСТУХавекмнорстух]/,
            casing: 'upper'
        }
    };

    const getNumberMask = () => {
        if (subject === 1) { // Автомобиль
            return 'a999aa999';
        } else if (subject === 2) { // Мотоцикл
            return '9999aa99';
        }
        return '';
    };

    return (
        <div className={'form'}>
            <h3>Выписать пропуск</h3>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={1}>Автомобиль</option>
                <option value={2}>Мотоцикл</option>
            </select>
            <InputMask
                mask={getNumberMask()}
                value={number}
                onChange={onChangeNumber}
                maskChar={null}
                definitions={maskDefinitions}
            >
                {(inputProps) => <input {...inputProps} className={'input'} placeholder={'Номер ТС'} />}
            </InputMask>
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
                <label>
                    Выберите дату и время:
                    <input
                        className={'input'}
                        type='datetime-local'
                        value={dateTime}
                        onChange={onChangeDateTime}
                    />
                </label>
            )}
        </div>
    );
};

export default FormNumberTemlate;
