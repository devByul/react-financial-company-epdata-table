import {
  IGetFinancialParam,
  ICorpData,
  IGetFinancialData,
} from "../../interface/api/danawa/get";
import AxiosInstance from "../axiosInstant";

export default class API_Danawa extends AxiosInstance {
  async getTestData(key: any) {
    const url = "/test";
    const { data } = await this.API.get(url, { params: { key } });

    return { ...data };
  }

  async getSelectItem() {
    const url = "/select";
    const { data } = await this.API.get(url);

    return { ...data };
  }

  async getFinancialData(query: IGetFinancialParam) {
    const url = "/finacial";
    const { data } = await this.API.get(url, { params: { ...query } });

    const result = [...data].map((row: IGetFinancialData) => {
      const {
        idx,
        brnNm,
        carNm,
        CDwr001,
        CPlt001,
        CPmr001,
        CDsh001,
        CPnh001,
        CPor001,
        CPhs001,
        RTjo001,
        CPdg001,
        CPkd001,
        CPhk001,
        CPbn001,
        CDsh002,
      } = row;

      const tmp = financialDataAddComma({
        CDwr001,
        CPlt001,
        CPmr001,
        CDsh001,
        CPnh001,
        CPor001,
        CPhs001,
        RTjo001,
        CPdg001,
        CPkd001,
        CPhk001,
        CPbn001,
        CDsh002,
      });

      return { idx, brnNm, carNm, ...tmp };
    });

    return [...result];
  }
}

const financialDataAddComma = (strObj: ICorpData) => {
  const reg = /\B(?=(\d{3})+(?!\d))/g;
  let minPayment = { field: "", min: 0 };
  let minResidualAmount = { field: "", min: 0 };
  const result: { [key: string]: any } = {};
  Object.keys(strObj).map((key) => {
    const amount = strObj[key];
    if (amount === "-") return amount;

    const split = amount.split(",");
    const payment = split[0].replace(reg, ",") + "원";
    const residualAmount = split[1].replace(reg, ",") + "원";
    const ratio = split[2] + "%";

    if (minPayment.field === "" && minResidualAmount.field === "") {
      minPayment.field = key;
      minPayment.min = +split[0];

      minResidualAmount.field = key;
      minResidualAmount.min = +split[1];
    } else {
      if (minPayment.min > +split[0]) {
        minPayment.field = key;
        minPayment.min = +split[0];
      }
      if (minResidualAmount.min > +split[1]) {
        minResidualAmount.field = key;
        minResidualAmount.min = +split[1];
      }
    }

    result[key] = {
      payment,
      residualAmount,
      ratio,
      minPayment: false,
      minResidualAmount: false,
    };
  });

  try {
    result[minPayment.field].minPayment = true;
    result[minResidualAmount.field].minResidualAmount = true;
  } catch (error) {
    console.error(error);
  }

  return result;
};
