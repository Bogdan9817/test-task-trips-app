import { useContext, useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react";

import { getAvailableDrivers, createTrip } from "../../api/trip";

import { ValidateTrip } from "./validate";

import { GlobalContext } from "../../context/global/GlobalContext";
import { UserContext } from "../../context/user/UserContext";

import FormFieldInput from "../../UI/form-field-input/FormFieldInput";
import FormFieldDate from "../../UI/form-field-date/FormFieldDate";
import FormFieldSelector from "../../UI/form-field-selector/FormFieldSelector";
import FormFieldNumInput from "../../UI/form-field-num-input/FormFieldNumInput";

import fields from "./fields.json";
import text from "./text.json";
import Loader from "../../UI/loader/Loader";

export default function CreateTripForm() {
  const [trip, setTrip] = useState({});
  const [selectorStore, setSelectorStore] = useState({});
  const [load, setLoad] = useState(false);
  const { setErrors, setSuccessMsg } = useContext(GlobalContext);
  const { dispatch } = useContext(UserContext);
  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };
  const { others } = text.createTripForm.errors;
  const { tripAdded } = text.createTripForm.success;

  const handleClick = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      await ValidateTrip(trip);
      try {
        const res = await createTrip(trip);
        dispatch({
          action: "ADD_TRIP",
          payload: {
            data: res,
          },
        });
        setSuccessMsg(tripAdded);
      } catch (e) {
        setErrors([others]);
      }
    } catch (errs) {
      setErrors(errs);
    }
    setLoad(false);
  };

  useEffect(() => {
    const loadDrivers = async () => {
      const res = await getAvailableDrivers(trip.timeFrom, trip.timeTo);
      setSelectorStore((store) => {
        return { ...store, drivers: res };
      });
    };
    if (trip.timeFrom && trip.timeTo) {
      loadDrivers();
    }
  }, [trip]);

  if (load) {
    return <Loader />;
  }

  return (
    <Form p='1'>
      {fields.tripForm.map((field) => {
        if (field.type === "date") {
          return (
            <FormFieldDate
              key={field.id}
              value={field.value}
              label={field.label}
              id={field.id}
              onChange={handleChange}
            />
          );
        }
        if (field.type === "selector") {
          return (
            <FormFieldSelector
              key={field.id}
              label={field.label}
              value={field.value}
              id={field.id}
              allowedValues={selectorStore[field.valuesStore] || []}
              onChange={handleChange}
              defaultValue='none'
            />
          );
        }
        if (field.type === "number") {
          return (
            <FormFieldNumInput
              key={field.id}
              value={field.value}
              label={field.label}
              id={field.id}
              subType={field.subType}
              onChange={handleChange}
            />
          );
        }
        return (
          <FormFieldInput
            key={field.id}
            label={field.label}
            value={field.value}
            id={field.id}
            onChange={handleChange}
          />
        );
      })}

      <Button dark onClick={handleClick}>
        {text.createTripForm.createTripBtn}
      </Button>
    </Form>
  );
}
