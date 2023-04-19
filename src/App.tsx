import React, { useEffect, useState } from "react";
import { TableColumnsType } from "antd";
import { Select, Table, Button } from "antd";
import API_Danawa from "./api/danawa/get";
import {
  ExpandedDataType,
  TEpDataAPIQuery,
  TJogun,
  TPeorid,
  TProdType,
  ISelectAll,
  ISelectBrand,
  ISelectDtlTrim,
  ISelectModel,
  ISelectTrim,
} from "./interface/app";
const { Option } = Select;

const corp: {
  title: string;
  dataIndex: string;
  key: string;
  render: any;
}[] = [
  {
    title: "우리카드",
    dataIndex: "CDwr001",
    key: "CDwr001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CDwr001")(value, record, index),
  },
  {
    title: "롯데캐피탈",
    dataIndex: "CPlt001",
    key: "CPlt001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CPlt001")(value, record, index),
  },
  {
    title: "메리츠캐피탈",
    dataIndex: "CPmr001",
    key: "CPmr001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CPmr001")(value, record, index),
  },
  {
    title: "신한카드",
    dataIndex: "CDsh001",
    key: "CDsh001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CDsh001")(value, record, index),
  },
  {
    title: "농협캐피탈",
    dataIndex: "CPnh001",
    key: "CPnh001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CPnh001")(value, record, index),
  },
  {
    title: "오릭스캐피탈",
    dataIndex: "CPor001",
    key: "CPor001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CPor001")(value, record, index),
  },
  {
    title: "엠캐피탈",
    dataIndex: "CPhs001",
    key: "CPhs001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CPhs001")(value, record, index),
  },
  {
    title: "조이렌터카",
    dataIndex: "RTjo001",
    key: "RTjo001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("RTjo001")(value, record, index),
  },
  {
    title: "DGB캐피탈",
    dataIndex: "CPdg001",
    key: "CPdg001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CPdg001")(value, record, index),
  },
  {
    title: "KDB캐피탈",
    dataIndex: "CPkd001",
    key: "CPkd001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CPkd001")(value, record, index),
  },
  {
    title: "한국캐피탈",
    dataIndex: "CPhk001",
    key: "CPhk001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CPhk001")(value, record, index),
  },
  {
    title: "BNK캐피탈",
    dataIndex: "CPbn001",
    key: "CPbn001",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CPbn001")(value, record, index),
  },
  {
    title: "신한카드고잔가",
    dataIndex: "CDsh002",
    key: "CDsh002",
    render: (value: any, record: any, index: number) =>
      tableColumnsRenderHandler("CDsh002")(value, record, index),
  },
];

const tableColumnsRenderHandler =
  (key: string) => (value: any, record: any, index: number) => {
    if (value) {
      const data = record[key];
      const { payment, residualAmount, ratio, minPayment, minResidualAmount } =
        data;
      return (
        <div style={{ whiteSpace: "nowrap" }} key={key}>
          <p style={{ fontWeight: minPayment ? "bold" : "normal" }}>
            {payment}
          </p>
          <p style={{ color: minResidualAmount ? "blue" : "black" }}>
            {residualAmount}
          </p>
          <p>{ratio}</p>
        </div>
      );
    } else {
      return "-";
    }
  };

const tableColumns: TableColumnsType<ExpandedDataType> = [
  { title: "브랜드명", dataIndex: "brnNm", key: "brnNm" },
  { title: "차량명", dataIndex: "carNm", key: "carNm" },
  ...corp,
];

function App() {
  const api = new API_Danawa();

  const [viewData, setViewData] = useState<any>();
  const [allSelectItem, setAllSelectItem] = useState<ISelectAll[] | any>();
  const [brandSelectItem, setBrandSelectItem] = useState<
    ISelectBrand[] | any
  >();
  const [modelSelectItem, setModelSelectItem] = useState<
    ISelectModel[] | any
  >();
  const [trimSelectItem, setTrimSelectItem] = useState<ISelectTrim[] | any>();
  const [dtlTrimSelectItem, setDtlTrimSelectItem] = useState<
    ISelectDtlTrim[] | any
  >();

  const [prodType, setProdType] = useState<TProdType>("L");
  const [period, setPeriod] = useState<TPeorid>(36);
  const [jogun, setJogun] = useState<TJogun>(1);
  const [checkBrand, setCheckBrand] = useState<number>(303);
  const [checkModel, setCheckModel] = useState<number | null>(null);
  const [checkTrim, setCheckTrim] = useState<number | null>(null);
  const [checkDtlTrim, setCheckDtlTrim] = useState<number | null>(null);

  const [isLoding, setIsLoding] = useState(false);

  const initGetSelectItem = async () => {
    try {
      setIsLoding(true);
      const { brand, model, trim, dtlTrim } = await api.getSelectItem();
      setAllSelectItem({ brand, model, trim, dtlTrim });
      setBrandSelectItem(brand);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoding(false);
    }
  };

  const getViewDataHandler = async () => {
    try {
      setIsLoding(true);
      const query = {
        brnNo: checkBrand,
        modlNo: checkModel,
        trimNo: checkTrim,
        dtlTrimNo: checkDtlTrim,
        prodType: prodType,
        period: period,
        jogun: jogun,
      };
      const data = await api.getFinancialData(query);

      setViewData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoding(false);
    }
  };

  const setSelectItem = (key: TEpDataAPIQuery) => (value: any) => {
    switch (key) {
      case "prod":
        setProdType(value);
        break;
      case "period":
        setPeriod(value);
        break;
      case "jogun":
        setJogun(value);
        break;
      case "brn":
        setCheckBrand(value);
        setCheckModel(null);
        setCheckTrim(null);
        setCheckDtlTrim(null);
        break;
      case "mdl":
        setCheckModel(value);
        setCheckTrim(null);
        setCheckDtlTrim(null);
        break;
      case "trim":
        setCheckTrim(value);
        setCheckDtlTrim(null);
        break;
      case "dtlTrim":
        setCheckDtlTrim(value);
        break;
    }
  };

  useEffect(() => {
    initGetSelectItem();
  }, []);

  // 메뉴 선택에 따른 필터링
  useEffect(() => {
    if (allSelectItem) {
      const { model }: any = allSelectItem;
      const setValue = model[checkBrand];

      setValue?.sort((a: any, b: any) => {
        const x = a.MODL_C_NO;
        const y = b.MODL_C_NO;
        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      });

      setModelSelectItem(setValue);
    }
  }, [allSelectItem, checkBrand]);
  useEffect(() => {
    if (allSelectItem && checkModel) {
      const { trim }: any = allSelectItem;
      const key = `${checkBrand}${checkModel}`;
      const setValue = trim[key];

      setValue?.sort((a: any, b: any) => {
        const x = a.TRIM_C_NO;
        const y = b.TRIM_C_NO;
        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      });

      setTrimSelectItem(setValue);
    }
  }, [checkModel]);
  useEffect(() => {
    if (allSelectItem && checkModel) {
      const { dtlTrim }: any = allSelectItem;
      const key = `${checkBrand}${checkModel}${checkTrim}`;
      const setValue = dtlTrim[key];

      setValue?.sort((a: any, b: any) => {
        const x = a.DTL_TRIM_C_NO;
        const y = b.DTL_TRIM_C_NO;
        if (x < y) return 1;
        if (x > y) return -1;
        return 0;
      });

      setDtlTrimSelectItem(setValue);
    }
  }, [checkTrim]);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            whiteSpace: "nowrap",
          }}
        >
          <Select
            placeholder="금융상품 타입"
            style={{ minWidth: "120px" }}
            onChange={setSelectItem("prod")}
            value={prodType}
          >
            <Option value={"L"}>리스</Option>
            <Option value={"R"}>렌트</Option>
            <Option value={"I"}>할부</Option>
          </Select>
          <Select
            placeholder="계약 기간"
            style={{ minWidth: "120px" }}
            onChange={setSelectItem("period")}
            value={period}
          >
            <Option value={36}>36 개월</Option>
            <Option value={48}>48 개월</Option>
            <Option value={60}>60 개월</Option>
          </Select>
          <Select
            placeholder="상품 조건"
            style={{ width: "140px" }}
            onChange={setSelectItem("jogun")}
            value={jogun}
          >
            <Option value={1}>보증금0/선납금0</Option>
            <Option value={2}>보증금0/선납금30</Option>
            <Option value={3}>보증금30/선납금0</Option>
          </Select>
        </div>
        <div style={{ display: "flex", gap: "10px", whiteSpace: "nowrap" }}>
          <Select
            placeholder="차량 브랜드"
            style={{ minWidth: "130px" }}
            onChange={setSelectItem("brn")}
            value={
              brandSelectItem ? brandSelectItem[checkBrand][0].BRN_C_NM : null
            }
          >
            {brandSelectItem &&
              Object.keys(brandSelectItem).map((key: string) => {
                const { BRN_C_NO, BRN_C_NM } = brandSelectItem[key][0];
                return (
                  <Option key={key} value={BRN_C_NO}>
                    {BRN_C_NM}
                  </Option>
                );
              })}
          </Select>
          <Select
            placeholder="차량 모델"
            style={{ minWidth: "120px" }}
            onChange={setSelectItem("mdl")}
            value={
              checkModel && modelSelectItem
                ? modelSelectItem.find((e: any) => e.MODL_C_NO === checkModel)
                    .MODL_C_NM
                : null
            }
          >
            {modelSelectItem && checkBrand ? (
              modelSelectItem.map((item: any) => {
                const { MODL_C_NO, MODL_C_NM } = item;
                return (
                  <Option key={MODL_C_NO} value={MODL_C_NO}>
                    {MODL_C_NM}
                  </Option>
                );
              })
            ) : (
              <></>
            )}
          </Select>
          <Select
            placeholder="차량 트림"
            onChange={setSelectItem("trim")}
            value={
              checkTrim && trimSelectItem
                ? trimSelectItem.find((e: any) => e.TRIM_C_NO === checkTrim)
                    .TRIM_C_NM
                : null
            }
          >
            {trimSelectItem && checkModel ? (
              trimSelectItem.map((item: any) => {
                const { TRIM_C_NO, TRIM_C_NM } = item;
                return (
                  <Option key={TRIM_C_NO} value={TRIM_C_NO}>
                    {TRIM_C_NM}
                  </Option>
                );
              })
            ) : (
              <></>
            )}
          </Select>
          <Select
            placeholder="차량 상세트림"
            onChange={setSelectItem("dtlTrim")}
            value={
              checkDtlTrim && dtlTrimSelectItem
                ? dtlTrimSelectItem.find(
                    (e: any) => e.DTL_TRIM_C_NO === checkDtlTrim
                  ).DTL_TRIM_C_NM
                : null
            }
          >
            {dtlTrimSelectItem && checkTrim ? (
              dtlTrimSelectItem.map((item: any) => {
                const { DTL_TRIM_C_NO, DTL_TRIM_C_NM } = item;
                return (
                  <Option key={DTL_TRIM_C_NO} value={DTL_TRIM_C_NO}>
                    {DTL_TRIM_C_NM}
                  </Option>
                );
              })
            ) : (
              <></>
            )}
          </Select>
          <Button type="primary" onClick={(e) => getViewDataHandler()}>
            검색
          </Button>
        </div>
      </div>
      <Table
        scroll={{ x: "200vw" }}
        loading={isLoding}
        columns={tableColumns}
        dataSource={viewData}
      />
    </div>
  );
}

export default App;
