import { useState } from "react"
import { MdClose } from "react-icons/md"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { setIsLoading, setUser } from "../app/slices/authSlice"

const UpdateProfile = ({ setIsOpen }) => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector(state => state.auth);

    // Correct usage of useState instead of useSelector for form values
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [bio, setBio] = useState(user.profile?.bio || '');
    const [skills, setSkills] = useState(user?.profile?.skills?.join(',') || '');
    const [resume, setResume] = useState(null);
    

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        formData.append('skills', skills);
        formData.append('bio', bio);

        if (resume) {
            formData.append('resume', resume);
        }

        dispatch(setIsLoading(true));

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/update/profile`, {
                method: "POST",
                credentials:'include',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                dispatch(setUser(data.user));
                toast.success(data.message);
                setIsOpen(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    return (
        <div className='fixed  top-1/2  left-1/2 max-w-md w-full bg-white z-40 custom-shadow p-5 rounded-lg -translate-x-1/2 -translate-y-1/2'>
            <div className="flex items-center mb-5 justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Update Profile</h2>
                <MdClose size={25} cursor={"pointer"} onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900" />
            </div>
            <form className="space-y-4" onSubmit={handleUpdateProfile}>
             
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="border w-full rounded-xl border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />


                {/* Phone Number Input */}


                <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="border w-full rounded-xl border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                {/* Bio Input */}




                <input
                    type="text"
                    id="skills"
                    name="skills"
                    className="border w-full rounded-xl border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="Enter skills e.g., React, Node.js, etc."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required
                />



              
                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        className="border rounded-xl border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        onChange={(e) => setResume(e.target.files[0])}
                    />
                



             

                <textarea
                    name="bio"
                    id="bio"
                    className="border resize-none w-full rounded-xl border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    value={bio}
                    rows={3}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a little about yourself..."
                />


                {/* Submit Button */}
                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full py-2 bg-purple-600 text-white font-semibold rounded-xl cursor-pointer hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                    {isLoading ? 'Please wait...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );

}

export default UpdateProfile;
