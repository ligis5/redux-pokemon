import { createAction } from "@reduxjs/toolkit";

export const userCallBegan = createAction("user/callBegan");
export const userCallSuccess = createAction("user/callSuccess");
export const userCallFailed = createAction("user/callFailed");
