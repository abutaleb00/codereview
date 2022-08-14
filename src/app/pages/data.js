import NomineeInformation from "../UserApplication/NomineeInformation";
import TransactionProfile from "../UserApplication/TransactionProfile";
import NewAccount from "../UserApplication/NewAccount";
import AdditionalQuestion from "../UserApplication/AdditionalQuestion";
import RiskInput from "../UserApplication/RiskInput";

const allInAccordians = [
  {
    id: 1,
    title: "New Account",
    info: "New Account Information",
    component: NewAccount,
  },

  {
    id: 2,
    title: "Transaction Profile",
    info: "Transaction Profile",
    component: TransactionProfile,
  },
  {
    id: 3,
    title: "Nominee Information",
    info: "All Nominee Information",
    component: NomineeInformation,
  },
  // {
  //   id: 4,
  //   title: "Documents",
  //   info: "All Documents",
  // },
  {
    id: 5,
    title: "Risk Grading",
    info: "Additional Information",
    component: RiskInput,
  },
  {
    id: 6,
    title: "Additional Information",
    info: "Additional Information",
    component: AdditionalQuestion,
  },
  // {
  //   id: 6,
  //   title: "Customer Risk Grading",
  //   info: "Customer Risk Grading",
  //   component: RiskGrading,
  // },
];
export default allInAccordians;
