import type { TCommonBtnProps } from "../../types/shared.type"

function CommonButton({className , children, value} : TCommonBtnProps) {
  return (
        <button disabled={value} className={`${className} bg-primary-btn cursor-pointer text-white`}> <span>{children}</span> </button>
  )
}

export default CommonButton