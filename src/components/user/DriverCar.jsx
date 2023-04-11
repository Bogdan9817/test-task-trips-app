import { useContext, useEffect, useState } from "react";
import { FaEdit, FaMinus } from "react-icons/fa";
import { Alert, Button, Form } from "bootstrap-4-react";

import { getDriverCar, setDriverCar } from "../../api/driver";

import { GlobalContext } from "../../context/global/GlobalContext";

import { validateCar } from "./validate";

import FormFieldInput from "../../UI/form-field-input/FormFieldInput";
import Value from "../../UI/value/Value";

import "./styles/driver-car.css";

import text from "./text.json";
import Loader from "../../UI/loader/Loader";

export default function DriverCar() {
  const [edit, setEdit] = useState(false);
  const [car, setCar] = useState(null);
  const [load, setLoad] = useState(false);
  const { user, setErrors, setSuccessMsg } = useContext(GlobalContext);

  const { others } = text.driverCar.errors;
  const { carAdded } = text.driverCar.success;

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const trigger = () => {
    setEdit(!edit);
  };

  const handleSave = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      await validateCar(car);
      try {
        await setDriverCar(user.uid, car);
        setSuccessMsg(carAdded);
        setEdit(false);
      } catch (e) {
        setErrors([others]);
      }
    } catch (errors) {
      setErrors(errors);
    }
    setLoad(false);
  };

  useEffect(() => {
    async function loadCar() {
      setLoad(true);
      const res = await getDriverCar(user.uid);
      res ? setEdit(false) : setEdit(true);
      setCar(res);
      setLoad(false);
    }
    if (user.uid) {
      loadCar();
    }
  }, [user.uid]);

  if (load) {
    return <Loader />;
  }

  return (
    <div>
      <div className='driver-car-heading'>
        <h3 className='driver-car-heading-text'>{text.driverCar.heading}</h3>
        {edit ? (
          <FaMinus size={36} onClick={trigger} color='#343434' />
        ) : (
          <FaEdit size={36} onClick={trigger} color='#343434' />
        )}
      </div>
      {!car && <Alert warning>{text.driverCar.alert}</Alert>}
      {edit ? (
        <Form>
          <FormFieldInput
            id='form-car-model-id'
            label='Модель'
            value='model'
            onChange={handleChange}
          />
          <FormFieldInput
            id='form-car-lpn-id'
            label='Реєстраційний номер'
            value='lpn'
            onChange={handleChange}
          />
          <FormFieldInput
            id='form-car-color-id'
            label='Колір'
            value='color'
            onChange={handleChange}
          />
          <Button dark onClick={handleSave}>
            {text.driverCar.saveCarBtn}
          </Button>
        </Form>
      ) : (
        <>
          <Value label='Модель' value={car?.model} />
          <Value label='Реєстраційний номер' value={car?.lpn} />
          <Value label='Колір' value={car?.color} />
        </>
      )}
    </div>
  );
}
