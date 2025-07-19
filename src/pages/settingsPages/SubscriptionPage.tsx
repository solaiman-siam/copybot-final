import { Empty, Modal, Popconfirm, Segmented, type PopconfirmProps } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLazyCancelPlanQuery, useTransactionListQuery } from "../../redux/features/subscribe/subscribeApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";



function SubscriptionPage() {
  type Align = "Monthly" | "Anually";

  const [alignValue, setAlignValue] = useState<Align>("Monthly");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // invoice list
  const { data } = useTransactionListQuery("");
  const invoiceList = data?.data;


  // cancel plan
    const [
      cancelPlan,
      { data: cancelResponse, isError: isCancelError, isSuccess, error },
    ] = useLazyCancelPlanQuery();


  
  // server route section
  useEffect(() => {
    if (isCancelError) {
      const errorData = error as FetchBaseQueryError;
      toast.error(
        (errorData.data as { message?: string })?.message ||
          "Something went wrong"
      );
    }
    if (isSuccess && cancelResponse) {
      toast.success(cancelResponse.message);
    }
  }, [cancelResponse, isCancelError, isSuccess, error]);

  

  const handleCancelPlan: PopconfirmProps["onConfirm"] = async() => {
    await cancelPlan('');

  };
  return (
    <div className="rounded-2xl  border border-black/10  p-5 lg:p-8">
      <h3 className="text-2xl font-semibold pb-8 "> Overview</h3>
      <div>
        <h4 className="text-lg pb-2 font-semibold text-textPrimary">Summary</h4>
        <p className="font-medium text-description">
          Your workspace was created on May 15, 2025.
        </p>
        <p className="font-medium text-description">
          Your Free plan allows you to generate 5 prompts per day..
        </p>
      </div>

      {/* <div className="pt-8">
        <h4 className="text-lg pb-2 font-semibold text-textPrimary">
          Total Cost
        </h4>
        <div className="flex items-center gap-12">
          <div className="flex flex-col gap-0">
            <h4 className="font-semibold text-lg">$0 /mo</h4>
            <p className="font-medium text-description">Renews jun 15, 2025</p>
          </div>
          <button
            onClick={showModal}
            className="font-medium cursor-pointer border border-black/10 px-6 py-2 rounded-lg"
          >
            Manage Billing
          </button>
        </div>
      </div> */}

      <div className="lg:pt-8 pt-5 ">
        <h4 className="text-lg pb-2 font-semibold text-textPrimary">Plan</h4>
        <Segmented
          value={alignValue}
          size="large"
          style={{ marginBottom: 8 }}
          onChange={setAlignValue}
          options={["Monthly", "Anually"]}
          className="custom-segment"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <div className="lg:p-6 p-4 rounded-xl border border-black/10 ">
            <h3 className="font-semibold text-lg text-textPrimary pb-1">
              Free
            </h3>
            <h4 className="text-textPrimary font-medium">Try Copybot</h4>
            <h4 className="font-medium text-description pt-6">
              <span className="text-xl font-semibold text-textPrimary ">
                $0
              </span>
            </h4>
            <div className="lg:pt-8 pt-5">
              <button className="w-full py-3 rounded-lg cursor-pointer bg-black/20 text-description font-medium">
                Current Plan
              </button>
            </div>
          </div>
          <div className="lg:p-6 p-4 rounded-xl border border-black/10 ">
            <h3 className="font-semibold text-lg text-textPrimary pb-1">Pro</h3>
            <h4 className="text-textPrimary font-medium">
              For Everyday Productivity
            </h4>
            <h4 className="font-medium text-description pt-6">
              <span className="text-xl font-semibold text-textPrimary ">
                ${alignValue === "Monthly" ? "19.97" : "197"}
              </span>
              /{alignValue === "Monthly" ? "monthly" : "anually"}
            </h4>
            <Link to={"/upgrade-plan"} className="">
              <button className="w-full py-3 mt-8 rounded-lg cursor-pointer border bg-black text-white font-medium">
                Upgrade to Pro
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:pt-8 pt-5">
        <h4 className="text-lg cursor-pointer pb-2 font-semibold text-textPrimary">
          Manage Billing
        </h4>
        <div className="border space-y-4  border-black/10 p-6 rounded-lg">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-textPrimary pb-1.5">
                Invoices
              </h3>
              <p className="font-medium text-description">
                View your past and upcoming invoices
              </p>
            </div>
            <button
              onClick={showModal}
              className=" w-40 py-2.5 cursor-pointer  rounded-lg border border-black/80  font-medium text-nowrap"
            >
              View Invoices
            </button>
          </div>
          <hr className="text-black/10" />
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-textPrimary pb-1.5">
                Cancellation
              </h3>
              <p className="font-medium text-description ">
                If you cancel your subscription, you'll keep access to your
                workspace through the end of the month.
              </p>
            </div>
             <Popconfirm
            title="Subscription"
            description="Are you sure to cancel subscription? "
            onConfirm={handleCancelPlan}
            okText="Yes"
            cancelText="No"
          >
            <button  className="w-40 py-2.5 font-medium rounded-lg border border-red-400 text-red-500 cursor-pointer  text-nowrap">
              Cancel Plan
            </button>
          </Popconfirm>
           
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal
        title={<p className="text-lg font-medium">Past Invoices</p>}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="p-4 space-y-5">

          {invoiceList?.length < 1 ? <> <Empty/> </> : invoiceList?.map((invoice : {exp_year : string, amount: number , plan_name: string}) => (
            <div className="flex flex-col gap-2 ">
              <div className=" flex px-8  justify-between items-center">
                <h4 className="font-medium">Period</h4>
                <h4 className="font-medium">Amount</h4>
                <h4 className="font-medium">Plan</h4>
              </div>
              <div className="border px-4 py-3 flex justify-between rounded-xl border-black/10">
                <h4 className="font-medium translate-x-4">{invoice?.exp_year}</h4>
                <h4 className="font-medium translate-x-3">${invoice?.amount}</h4>
                <h4 className="font-medium -translate-x-2 capitalize">{invoice?.plan_name}</h4>
              </div>
            </div>
          ))}
          
        </div>
      </Modal>
    </div>
  );
}

export default SubscriptionPage;