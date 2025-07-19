import type { TContainerProps } from "../../types/shared.type"

function Container({children} : TContainerProps ) {
  return (
    <div className="container max-w-[1320px] mx-auto">
        {children}
    </div>
  )
}

export default Container