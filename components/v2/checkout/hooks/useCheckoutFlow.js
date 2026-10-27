"use client";
import { useMemo, useReducer } from "react";
import {
  DELIVERY,
  HOME_CITY,
  NEW_ADDRESS,
  STEP,
  getStepIndex,
} from "../lib/constants";
import { getDeliveryOptions } from "../lib/delivery";

const initialState = {
  step: STEP.ADDRESS,
  choice: null, // saved address id | NEW_ADDRESS | null (= use default)
  draftCity: HOME_CITY, // city typed in the "new address" form
  confirmedAddress: null,
  oneOffAddress: null, // confirmed new address the user chose NOT to save
  delivery: DELIVERY.STANDARD,
  payment: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "choose_address":
      return { ...state, choice: action.id };
    case "draft_city":
      return state.draftCity === action.city
        ? state
        : { ...state, draftCity: action.city };
    case "confirm_address":
      return {
        ...state,
        step: STEP.DELIVERY,
        confirmedAddress: action.address,
        choice: action.saved ? action.address.id : NEW_ADDRESS,
        oneOffAddress: action.saved ? null : action.address,
      };
    case "choose_delivery":
      return { ...state, delivery: action.id };
    case "confirm_delivery":
      return { ...state, step: STEP.PAYMENT, delivery: action.id };
    case "choose_payment":
      return { ...state, payment: action.id };
    case "go_to":
      // Only allow going back to a step the user has already completed.
      return getStepIndex(action.step) < getStepIndex(state.step)
        ? { ...state, step: action.step }
        : state;
    default:
      return state;
  }
}

/**
 * Owns the step machine and the user's selections. Derived values (effective
 * address choice, current city, available delivery options) are computed here
 * so components stay presentational.
 */
export function useCheckoutFlow({ addresses }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const defaultAddress =
    addresses.find((a) => a.isDefault) ?? addresses[0] ?? null;

  const choice =
    state.choice === NEW_ADDRESS || addresses.some((a) => a.id === state.choice)
      ? state.choice
      : (defaultAddress?.id ?? NEW_ADDRESS);

  const selectedAddress = addresses.find((a) => a.id === choice) ?? null;
  const city =
    selectedAddress?.city ??
    (choice === NEW_ADDRESS ? state.draftCity : HOME_CITY);

  const deliveryOptions = useMemo(
    () => getDeliveryOptions({ city }),
    // re-evaluate on step change so the same-day cut-off stays fresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [city, state.step],
  );

  const delivery =
    deliveryOptions.find((o) => o.id === state.delivery && o.available)?.id ??
    DELIVERY.STANDARD;

  const actions = useMemo(
    () => ({
      chooseAddress: (id) => dispatch({ type: "choose_address", id }),
      setDraftCity: (c) => dispatch({ type: "draft_city", city: c }),
      confirmAddress: (address, { saved }) =>
        dispatch({ type: "confirm_address", address, saved }),
      chooseDelivery: (id) => dispatch({ type: "choose_delivery", id }),
      confirmDelivery: (id) => dispatch({ type: "confirm_delivery", id }),
      choosePayment: (id) => dispatch({ type: "choose_payment", id }),
      goTo: (step) => dispatch({ type: "go_to", step }),
    }),
    [],
  );

  return {
    step: state.step,
    choice,
    city,
    deliveryOptions,
    delivery,
    payment: state.payment,
    confirmedAddress: state.confirmedAddress,
    oneOffAddress: state.oneOffAddress,
    actions,
  };
}
