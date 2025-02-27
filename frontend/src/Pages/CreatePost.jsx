import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils/index";
import toast from "react-hot-toast";


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.data && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });

        await response.json();
        navigate("/");
        toast.success("Image Shared Successfully!");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Error Sharing image!");
      }
      finally {
        setGeneratingImg(false);
      }
    } else {
      toast.error("Please enter a Prompt");
    }
  };

  const generateImage = async () => {

    if (!form.prompt) {
      toast.error("Please enter a prompt!");
      return;
    }

    if (form.prompt) {
      try {
        setGeneratingImg(true);
        toast.loading("Generating image...");

        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: form.prompt })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); //extract JSON response
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        toast.dismiss();
        toast.success("Image generated successfully!");
        console.log("Generated Image Data:", data);

      } catch (error) {
        toast.dismiss();
        toast.error("Error generating image!");
        console.error("Error generating image:", error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      toast.error("Please enter a Prompt");
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl  mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div>
        <h1 className="font-extrabold text-[#1A202C] text-[36px]">Create</h1>
        <p className="mt-2 text-[#4A5568] text-[16px]">
          Generate an imaginative image through DALL-E AI and share it with the
          community.
        </p>
      </div>

      <form className="mt-10 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />


          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>

        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className={` cursor-pointer relative flex items-center justify-center w-full py-3 px-6 rounded-lg text-lg font-semibold text-white transition-all duration-300 ${generatingImg
              ? "bg-gradient-to-r from-purple-500 to-indigo-500 cursor-not-allowed"
              : "bg-[#4C51BF] hover:bg-[#3B41C1]"
              }`}
            disabled={generatingImg}
          >
            {generatingImg ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white cursor-pointer"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3-3-3h4z"
                  />
                </svg>
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>
        <div className="mt-10 text-center">
          <p className="mt-3 text-gray-700 text-lg font-medium">
            🚀 **Loved your creation?** Share it with the community!
          </p>

          <button
            onClick={handleSubmit}
            type="submit"
            className={` cursor-pointer mt-5 flex items-center justify-center gap-2 text-white font-semibold rounded-lg px-5 py-2 text-base transition-all duration-300 ${loading
              ? "bg-gradient-to-r from-green-400 to-blue-500 cursor-not-allowed"
              : "bg-[#4C51BF] hover:bg-[#3B41C1] shadow-md hover:shadow-lg"
              }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3-3-3h4z"
                  />
                </svg>
                Sharing...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l-4-4m0 0l4-4m-4 4h12a4 4 0 014 4v2" />
                </svg>
                Share with the Community
              </>
            )}
          </button>
        </div>


      </form>
    </section>
  );
};

export default CreatePost;
