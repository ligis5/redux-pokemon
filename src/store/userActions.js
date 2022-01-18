import { createAction } from "@reduxjs/toolkit";

export const userCallBegan = createAction("auth/callBegan");
export const userCallSuccess = createAction("auth/callSuccess");
export const userCallFailed = createAction("auth/callFailed");
