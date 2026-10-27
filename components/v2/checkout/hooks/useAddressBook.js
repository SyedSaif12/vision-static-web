"use client";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  deleteAddress,
  updateAddress,
} from "@/redux/user/userSlice";
import {
  getBaseLabel,
  getUniqueLabel,
  isSameAddress,
  toAddressPayload,
} from "../lib/addresses";

const sortDefaultFirst = (list) =>
  [...list].sort((a, b) => Number(!!b.isDefault) - Number(!!a.isDefault));

/** thunk rejects with a plain string; components expect an Error. */
async function run(promise, fallback) {
  try {
    return await promise.unwrap();
  } catch (e) {
    throw new Error(typeof e === "string" ? e : e?.message || fallback);
  }
}

/**
 * Saved addresses live in redux (`user.data.userAddress`) and are persisted by
 * the API. No local copy – every mutation goes: API → slice → this hook re-renders.
 */
export function useAddressBook() {
  const dispatch = useDispatch();
  const saved = useSelector((state) => state.user?.data?.userAddress);
  const addresses = useMemo(() => sortDefaultFirst(saved ?? []), [saved]);

  /** Creates an address (label auto-numbered) and returns the stored record. */
  const add = useCallback(
    async (fields) => {
      const duplicate = addresses.find((a) => isSameAddress(a, fields));
      if (duplicate) return duplicate;

      const label = getUniqueLabel(fields.label, addresses);
      const result = await run(
        dispatch(
          createAddress({ payload: toAddressPayload({ ...fields, label }) }),
        ),
        "Could not save the address.",
      );
      return result.data;
    },
    [addresses, dispatch],
  );

  /** Edits an address. The label is only renumbered when its type changes. */
  const update = useCallback(
    async (id, fields) => {
      const current = addresses.find((a) => a.id === id);
      const label =
        current && getBaseLabel(current.label) === fields.label
          ? current.label
          : getUniqueLabel(fields.label, addresses, id);

      const result = await run(
        dispatch(
          updateAddress({
            id,
            payload: toAddressPayload({ ...fields, label }),
          }),
        ),
        "Could not update the address.",
      );
      return result.data;
    },
    [addresses, dispatch],
  );

  const remove = useCallback(
    (id) =>
      run(dispatch(deleteAddress({ id })), "Could not remove the address."),
    [dispatch],
  );

  return { addresses, isReady: true, add, update, remove };
}
