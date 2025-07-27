import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
const Account = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch user profile data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://zivaa.onrender.com/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUserData(data);
        setSelectedImage(data.avatar || ""); // ✅ Set image on load
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // ✅ Input field changes
  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Save profile changes
  const handleSave = async () => {
    try {
      const res = await fetch("https://zivaa.onrender.com/api/auth/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      });

      await res.json();
      setMessage("✅ Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("❌ Update failed.");
    }
  };

  // ✅ Upload new profile image
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); // preview
    setSelectedImage(imageUrl);

    const formData = new FormData();
    formData.append("avatar", file);

    fetch("https://zivaa.onrender.com/api/auth/account/avatar", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // DON'T manually set content-type for FormData
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData((prev) => ({ ...prev, avatar: data.avatar }));
        // don't update selectedImage to server image again
      })
      .catch((err) => console.error("Upload error:", err));
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen mt-24 px-6 lg:px-0"
    >
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-zivaa-light">
          <div className="flex items-center gap-4">
            {/* Profile Image */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-zivaa-primary group">
  {selectedImage || userData.avatar ? (
    <img
      src={
        selectedImage.startsWith("blob:")
          ? selectedImage
          : `https://zivaa.onrender.com${userData.avatar}`
      }
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
      <FaUserCircle size={40} />
    </div>
  )}

  {/* Hidden file input */}
  <input
    type="file"
    accept="image/png, image/jpeg, image/webp"
    onChange={handleImageChange}
    className="hidden"
    id="avatarInput"
  />

  {/* Pencil icon overlay */}
  <label
    htmlFor="avatarInput"
    className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition"
  >
  <FaPen className="text-white" />
  </label>
</div>


            {/* Name and Email */}
            <div>
              <h2 className="text-2xl font-bold font-body text-zivaa-primary">
                {userData.name || "Your Name"}
              </h2>
              <p className="text-sm text-gray-500 font-serif">{userData.email}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setEditing(!editing)}
            className="mt-4 md:mt-0 px-5 py-2 rounded-md font-body text-white bg-zivaa-accent transition"
          >
            {editing ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>

     
  

        {/* Form Section */}
        <div className="grid md:grid-cols-2 gap-6 px-8 py-10">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-gray-700 font-medium font-body capitalize mb-2">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={userData[field]}
                onChange={handleChange}
                readOnly={!editing}
                className={`border rounded-md font-body px-4 py-2 outline-none transition ${
                  editing
                    ? "bg-white focus:ring-2 focus:ring-zivaa-primary"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Save Button */}
        {editing && (
          <div className="px-8 pb-10">
            <button
              onClick={handleSave}
              className=" text-white font-body px-6 py-2 rounded-md bg-zivaa-accent transition"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Message */}
        {message && (
          <div className="px-8 pb-6 font-body text-green-600 font-medium">{message}</div>
        )}
      </div>
    </motion.div>
  );
};

export default Account;
