import { Collapse, Empty } from "antd";
import { useGetFaqQuery } from "../../redux/features/cms/faqApi";
import { Minus, Plus } from "lucide-react";
import type { IFaq } from "../../types/global.types";

export const CollapsAccordion = () => {
  const { data } = useGetFaqQuery(undefined);

  const faqItems =
    data?.data?.map((faq: IFaq, index: number) => ({
      key: faq.id || index.toString(),
      label: <h3 className="text-lg font-semibold py-2">{faq.question}</h3>,
      children: <p className="text-description font-medium">{faq.answer}</p>,
    })) || [];

  if (data?.data?.length < 0) {
    return (
      <Empty
        style={{ fontWeight: "500" }}
        description={"No Chatlist Found"}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <Collapse
      key={"text-lg"}
      defaultActiveKey={"1"}
      expandIconPosition="end"
      style={{
        backgroundColor: "transparent",
        fontSize: "17px",
      }}
      className="custom-collapse"
      bordered={false}
      expandIcon={({ isActive }) => (
        <div
          className={`p-1 rounded-full border flex justify-center items-center duration-300 border-black/10 transition-all ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
        >
          {!isActive ? (
            <Plus size={18} className="text-black/80" />
          ) : (
            <Minus size={18} className="text-black/80" />
          )}
        </div>
      )}
      accordion
      items={faqItems}
    />
  );
};
