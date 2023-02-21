export const DEFAULT_NAMES = {
  APP_NAME: "Space Reservation App",
  CARELON_SITES: "Carelon Global Solutions Sites",
  LOADING_MESSAGE: "Loading...",
  NO_SITES: "No Sites",
}
export const ERROR_MESSAGE = {
    CONTACT: "Contact System Administrator"
}
export const urlDefinition = ["reservations", "search", "sites", "rooms", "reports"];
export const navDefinition = [
  { type: "reservations", title: "Reservation Requests", index: 0 },
  { type: "search", title: "Reserve Rooms", index: 1 },
  { type: "sites", title: "Sites", index: 2 },
  { type: "rooms", title: "Rooms", index: 3 },
  { type: "reports", title: "Reports", index: 4 },
];
export const reservationStatusActions = [
  { name: "cancel", value: "CANCELLED" },
  { name: "approve", value: "APPROVED" },
  { name: "reject", value: "REJECTED" },
];
export const reservationStatus = {
  SUBMITTED: "SUBMITTED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED",
};
export const ACTION_TYPES = {
  START: "START",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  LOGOUT: "LOGOUT",
};
export const FACILITY_TYPES = {
    CONFERENCE: "conference",
    TRAINING: "training",
    GYM: "gym",
    SLEEPING_QUARTERS: "sleeping"
}
export const FACILITY_TYPES_NAMES = {
    CONFERENCE: "Conference Room",
    TRAINING: "Training Room",
    GYM: "Gym",
    SLEEPING_QUARTERS: "Sleeping Quarters"
}
export const VIEW = {
  ADMIN: 'admin'
}
export const SITE_DEFAULT_ID = '63b56fea41184440f9f90696'
export const SITE_NAMES = {
  AGT: "Alliance Global Tower",
  GLAS: "GLAS Tower",
  OFT: "One Fintech",
  SMS: "SM Strata"
}
export const DURATION_VALUES = ["1", "2", "3", "4"]