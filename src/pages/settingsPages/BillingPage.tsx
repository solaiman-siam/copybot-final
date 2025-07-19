import { Link } from "react-router"
import { imageProvider } from "../../utils/imageProvider"


function BillingPage() {
  return (
    <div className="rounded-2xl border border-black/10 p-5 lg:p-8">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <img src={imageProvider.Leafe} alt="" />
            <div>
                <h3 className="text-lg font-semibold pb-px">Free Plan</h3>
                <p className="text-description font-medium">Try Copybot pro</p>
            </div>
        </div>
        <Link to={'/upgrade-plan'}>
        <button className="px-6 cursor-pointer py-2 tex rounded-lg bg-black text-white">
            Upgrade Plan
        </button>
        </Link>
      </div>
      <div className="pt-8 space-y-3  pl-3">
        <div className="flex items-center gap-2">
            <img src={imageProvider.Circle} alt="" />
            <h4 className="font-medium ">5 prompt generations per day</h4>
        </div>
        <div className="flex items-center gap-2">
            <img src={imageProvider.Circle} alt="" />
            <h4 className="font-medium ">Write, edit, and create content</h4>
        </div>
        <div className="flex items-center gap-2">
            <img src={imageProvider.Circle} alt="" />
            <h4 className="font-medium ">Chat on web, iOS, and Android</h4>
        </div>
        <div className="flex items-center gap-2">
            <img src={imageProvider.Circle} alt="" />
            <h4 className="font-medium ">Analyze own and prebuilt text</h4>
        </div>
      </div>
    </div>
  )
}

export default BillingPage