import { useEffect, useState } from "react";

import { Popover } from "@headlessui/react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import { VideoPlayerWrapper } from "../VideoPlayer";

// const navigation = [
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];
type Inputs = {
  email: string;
};

// const videoJsOptions = {
//   sources: [
//     {
//       src: "//vjs.zencdn.net/v/oceans.mp4",
//       type: "video/mp4",
//     },
//   ],
// };

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [videoJsOptions, setVideoJsOptions] = useState({
    sources: [
      {
        src: "https://gateway.storjshare.io/cstories/02.caving.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jw3a7iexmkp6rmlvq2epovji4brq%2F20220725%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220725T201041Z&X-Amz-Expires=900&X-Amz-Signature=907d0faa4ef047d48840e70c10bd5068f30ec2ca2b85ef6e0cdb2036fee1c68f&X-Amz-SignedHeaders=host",
        type: "video/mp4",
      },
    ],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();
  const [successForm, setSuccessForm] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post("/api/user", data);

      setSuccessForm(true);
    } catch (err) {
      // @ts-ignore
      if (err.response.data.code === "P2002") {
        setError("email", {
          message: "This email has already been registered.",
          type: "custom",
        });
      }
    }
  };

  useEffect(() => {
    const getFiles = async () => {
      const { data } = await axios.get("/api/s3");
      setCurrentUrl(data?.url);
      setVideoJsOptions({
        sources: [
          {
            src: data?.url,
            type: "video/mp4",
          },
        ],
      });
    };
    setMounted(true);
    if (mounted) {
      getFiles();
    }
  }, [mounted]);

  return (
    <div className="relative bg-white overflow-hidden">
      <div
        className="hidden lg:block lg:absolute lg:inset-0"
        aria-hidden="true"
      >
        <svg
          className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
          width={640}
          height={784}
          fill="none"
          viewBox="0 0 640 784"
        >
          <defs>
            <pattern
              id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
              x={118}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            y={72}
            width={640}
            height={640}
            className="text-gray-50"
            fill="currentColor"
          />
          <rect
            x={118}
            width={404}
            height={784}
            fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
          />
        </svg>
      </div>

      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <Popover>
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#">
                  <span className="text-lg font-bold text-accent">
                    CStories
                  </span>
                </a>
                {/* <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div> */}
              </div>
              <div className="hidden md:block md:ml-10 md:space-x-10">
                {/* {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))} */}
              </div>
            </div>
            {/* <div className="hidden md:block text-right">
              <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                >
                  Log in
                </a>
              </span>
            </div> */}
          </nav>

          {/* <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <a
                  href="#"
                  className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                >
                  Log in
                </a>
              </div>
            </Popover.Panel>
          </Transition> */}
        </Popover>

        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                  Coming soon
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">
                    Interactive stories for
                  </span>
                  <span className="block text-orange-500">
                    content creators
                  </span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Have you ever imagined creating a story where your audience
                decides what would be the next step on the same video?
                <br />
                <span className="font-bold text-orange-500">
                  We will make this possible!
                </span>
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <p className="text-base font-medium text-gray-900">
                  Sign up to get notified when it’s ready.
                </p>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-3 sm:flex"
                >
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="flex flex-col sm:flex-row w-full">
                    <div className="flex flex-col w-full">
                      <input
                        defaultValue=""
                        type="email"
                        className={`block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:flex-1 border-gray-300 ${
                          errors.email && "focus:ring-red-500 border-red-500"
                        }`}
                        placeholder={`${
                          errors.email
                            ? "Please enter a valid email"
                            : "Enter your email"
                        }`}
                        {...register("email", { required: true })}
                      />
                      {successForm && (
                        <span className="text-left text-xs text-green-500">
                          {`Congrats! You will be notified once it's live`}
                        </span>
                      )}
                      {errors.email && (
                        <span className="text-left text-xs text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      title="Notify me"
                      className="mt-3 max-h-[52px] w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                    >
                      Notify me
                    </button>
                  </div>
                </form>
                {/* <p className="mt-3 text-sm text-gray-500">
                  We care about the protection of your data. Read our{" "}
                  <a href="#" className="font-medium text-gray-900 underline">
                    Privacy Policy
                  </a>
                  .
                </p> */}
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <svg
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                width={640}
                height={784}
                fill="none"
                viewBox="0 0 640 784"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                    x={118}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  y={72}
                  width={640}
                  height={640}
                  className="text-gray-50"
                  fill="currentColor"
                />
                <rect
                  x={118}
                  width={404}
                  height={784}
                  fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                />
              </svg>
              <div className="relative mx-auto w-full flex flex-col align-center justify-center">
                <span className="text-sm text-center text-gray-500">
                  Proof of concept
                </span>
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <VideoPlayerWrapper
                    options={videoJsOptions}
                    currentVideoSrc={currentUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
