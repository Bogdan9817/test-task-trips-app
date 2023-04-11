import { useEffect, useState } from "react";
import Value from "../../UI/value/Value";
import "./styles/trip.css";
import { getDriverContacts } from "../../api/trip";
import { getDriverCar } from "../../api/driver";

export default function Trip({
  driver,
  from,
  passengerLimit,
  price,
  timeFrom,
  timeTo,
  to,
  loadContacts = true,
  loadCar = true,
}) {
  const [driverContacts, setDriverContacts] = useState({});
  const [driverCar, setDriverCar] = useState({});

  useEffect(() => {
    const loadDriverCar = async () => {
      const res = await getDriverCar(driver);
      setDriverCar(res);
    };
    const loadDriverContacts = async () => {
      const res = await getDriverContacts(driver);
      setDriverContacts(res);
    };
    if (driver && loadContacts) {
      loadDriverContacts();
      loadDriverCar();
    }
  }, [driver, loadContacts]);

  return (
    <div className='trip-container'>
      <div className='trip-row'>
        <Value value={from} label='Звідки' />
        <Value value={to} label='Куди' />
      </div>
      <div className='trip-row'>
        <Value value={new Date(timeFrom).toLocaleString()} label='Відїзд' />
        <Value value={new Date(timeTo).toLocaleString()} label='Прибуття' />
      </div>
      <div className='trip-row'>
        <Value value={price} label='Ціна грн.' />
        <Value value={passengerLimit} label='Кількість пассажирів' />
      </div>
      {loadCar && driverCar && (
        <div className='trip-row'>
          <Value value={driverCar?.model} label='Модель' />
          <Value value={driverCar?.lpn} label='Регістраційний номер' />
          <Value value={driverCar.color} label='Колір' />
        </div>
      )}
      {loadContacts && (
        <div className='trip-row'>
          <Value value={driverContacts?.name} label="Ім'я" />
          <Value value={driverContacts?.email} label='Пошта' />
          {driverContacts.phone && (
            <Value value={driverContacts.phone} label='Номер телефону' />
          )}
        </div>
      )}
    </div>
  );
}
