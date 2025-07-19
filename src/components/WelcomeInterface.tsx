

const WelcomeInterface = () => {
    return (
      <div className="w-full px-4 ">
        <div className="flex w-full lg:mt-40  items-center flex-col ">
          <h3 className="text-center text-3xl lg:text-4xl font-medium">
            Welcome to Copybot
          </h3>
          <p className="pt-3 h-11/12 lg:w-5/12 text-center text-description font-medium">
            Get started by writing a task and Chat can do the rest. Not sure
            where to start? Check out the Prompt Library for inspiration.
          </p>
        </div>
        {/* <div className="lg:grid hidden grid-cols-3 gap-4 pt-16 max-w-[1100px] mx-auto">
          <div className="flex flex-col gap-4 bg-[#F4EFEC] p-8 rounded-2xl">
            <div className="flex items-center gap-2 ">
              <img src={imageProvider.Search} alt="" />
              <h4 className="font-medium text-textPrimary">
                {" "}
                Keyword Research & Insights
              </h4>
            </div>
            <p className="font-medium text-description">
              Find trending keywords for fitness blogs.Summarize the latest
              updates in AI marketing
            </p>
          </div>
          <div className="flex flex-col gap-4 bg-[#F4EFEC] p-8 rounded-2xl">
            <div className="flex items-center gap-2 ">
              <img src={imageProvider.Calendar} alt="" />
              <h4 className="font-medium text-textPrimary">
                Long-Form Content
              </h4>
            </div>
            <p className="font-medium text-description">
              Find trending keywords for fitness blogs.Summarize the latest
              updates in AI marketing
            </p>
          </div>
          <div className="flex flex-col gap-4 bg-[#F4EFEC] p-8 rounded-2xl">
            <div className="flex items-center gap-2 ">
              <img src={imageProvider.Light} alt="" />
              <h4 className="font-medium text-textPrimary">
                {" "}
                Creative Brainstorming
              </h4>
            </div>
            <p className="font-medium text-description">
              Find trending keywords for fitness blogs.Summarize the latest
              updates in AI marketing
            </p>
          </div>
        </div> */}
      </div>
    );
};

export default WelcomeInterface;