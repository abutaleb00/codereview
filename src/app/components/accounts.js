export let account1 = [
  {
    dim: "4",
    id: "name",
    type: "text",
    maxLength: "40",
    title: "Product Type",
    isMandatory: true,
    val: "Saving",
    disable: true,
  },
];
export let account2 = [
  {
    dim: "4",
    id: "accountType",
    type: "text",
    maxLength: "40",
    title: "Account Type",
    isMandatory: true,
    val: "Single",
    disable: true,
  },
];
export let account3 = [
  {
    dim: "3",
    type: "tel",
    maxLength: "40",
    id: "initialDeposit",
    title: "Initial Deposit",
    isMandatory: true,
    val: "2000",
    disable: true,
  },
];
export let branch = [
  {
    dim: "4",
    id: "name",
    type: "text",
    maxLength: "40",
    title: "Preferred Branch",
    isMandatory: true,
    val: "Gulshan",
    disable: true,
  },
];
export let nominee = [
  {
    dim: "4",
    id: "name",
    type: "text",
    maxLength: "40",
    title: "Nominee Name",
    isMandatory: true,
    val: "",
    disable: false,
  },
  {
    dim: "4",
    id: "dob",
    type: "text",
    maxLength: "40",
    title: "Date of Birth",
    isMandatory: true,
    val: "",
    disable: false,
  },
  {
    dim: "4",
    type: "text",
    maxLength: "40",
    id: "relation",
    title: "Relation with A/C Holder",
    isMandatory: false,
    val: "",
    disable: false,
  },
  {
    dim: "4",
    type: "tel",
    maxLength: "40",
    id: "sharePercent",
    title: "Share Percentage",
    isMandatory: false,
    val: "",
    disable: false,
  },
  {
    dim: "4",
    id: "identityType",
    type: "text",
    maxLength: "40",
    title: "Identification Type",
    isMandatory: false,
    val: "",
    isMandatory: true,
    disable: false,
  },
  {
    dim: "4",
    id: "identityNumber",
    type: "tel",
    maxLength: "40",
    title: "Identification Number",
    isMandatory: true,
    val: "",
    disable: false,
  },
];
export let tpInfo = [
  {
    dim: "4",
    id: "profession",
    type: "text",
    maxLength: "40",
    title: "Profession",
    isMandatory: true,
    placeholder: "Enter Profession",
    disable: false,
  },
  {
    dim: "4",
    id: "monthlyIncome",
    type: "tel",
    maxLength: "40",
    title: "Monthly Income",
    isMandatory: true,
    placeholder: "Enter Monthly Income",
    disable: false,
  },
  {
    dim: "4",
    id: "sourceOfFund",
    type: "text",
    maxLength: "40",
    title: "Sources of Fund",
    isMandatory: true,
    placeholder: "Enter Sources of Fund",
    disable: false,
  },
];
export let newAccount = [
  {
    dim: "6",
    id: "accountType",
    type: "text",
    maxLength: "40",
    title: "Account Type",
    isMandatory: true,
    val: "Single",
    disable: true,
  },
  {
    dim: "6",
    id: "mtransectionlimit",
    type: "tel",
    maxLength: "40",
    title: "Monthly Transection Amount",
    isMandatory: true,
    val: "Up to 100,000BDT",
    disable: true,
  },
  {
    dim: "6",
    type: "text",
    maxLength: "40",
    id: "preferred",
    title: "Preferred Branch",
    isMandatory: true,
    val: "Gulshan",
    disable: true,
  },
];
