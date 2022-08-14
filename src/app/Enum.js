export const GENDER = {
  MALE: 0,
  FEMALE: 1,
  OTHERS: 2,
};

export const PRODUCTTYPE = {
  SAVINGS: 0,
  CURRENT: 1,
};

export const ACCOUNTTYPE = {
  SINGLE: 0,
  JOINT: 1,
};

export const MARITALSTATUS = {
  SINGLE: "Single",
  MARRIED: "Married",
};

export const ADDITIONALSERVICES = {
  CHECKBOOK: "Check Book",
  DEBITCARD: "Debit Card",
  SMSALERT: "SMS Alert",
};

export const IDENTITYTYPE = {
  NID: { name: "National ID", value: 3 },
  PASSPORT: { name: "Passport No", value: 5 },
  DrivingLicense: { name: "Driving License No", value: 8 },
  AdharCard: { name: "PAN / Aadhar Card No", value: 10 },
  BirthCertificate: { name: "Birth Certificate", value: 6 },
};

export const DOCUMENTCHECKLIST = {
  PHOTO: { name: "Photo", value: 1 },
  SIGNATURE: { name: "Signature", value: 2 },
  NIDFRONT: { name: "Nid Front", value: 3 },
  NIDBACK: { name: "Nid Back", value: 4 },
  PASSPORT: { name: "Passport", value: 5 },
  BirthCertificate: { name: "Birth Certificate", value: 6 },
  TIN: { name: "TIN", value: 7 },
  DrivingLicense: { name: "Driving License", value: 8 },
  OTHERS: { name: "Others", value: 9 },
  ADHARCARD: { name: "PAN / Aadhar Card No", value: 10 },
};

export const IDENTITYLIST = [
  IDENTITYTYPE.NID,
  IDENTITYTYPE.PASSPORT,
  IDENTITYTYPE.DrivingLicense,
  IDENTITYTYPE.AdharCard,
  IDENTITYTYPE.BirthCertificate,
];
