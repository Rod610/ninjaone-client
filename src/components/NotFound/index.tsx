import NotFoundLogo from "../../assets/ninja-404.svg";

const index = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center">
      <div className="flex flex-row items-center mx-auto my-10 text-center max-w-sm flex-wrap">
        <div>
          <h1 className="font-medium text-5xl leading-10">Page not found</h1>
        </div>
        <div>
          <div className="py-7">
            <p>Sorry, the post you are looking for is not available.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center sm:h-screen w-auto">
        <img
          src={NotFoundLogo}
          fetchPriority="high"
          alt="Not Found"
          loading="lazy"
          width={425}
          height={504}
          className="inline-block align-middle w-[424px]"
        />
      </div>
    </div>
  );
};

export default index;
