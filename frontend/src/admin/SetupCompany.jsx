import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SetupCompany = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        location: '',
        description: ''
    });
    const [logo, setLogo] = useState(null);
    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchCompany = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/companies/${id}`);
                const data = await res.json();

                if (data.success) {
                    const { name, website, location, description } = data.company;
                    setFormData({ name, website, location, description });
                    setCompany(data.company);
                    
                    
                } else {
                    setCompany(null);
                    toast.error(data.message || "Company not found");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch company data.");
                setCompany(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompany();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            return toast.error("Company name is required.");
        }

        const payload = new FormData();
        for (let key in formData) {
            payload.append(key, formData[key]);
        }
        if (logo) {
            payload.append("logo", logo);
        }

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/companies/update/${id}`, {
                method: "PUT",
                credentials: "include",
                body: payload
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message || "Company updated successfully.");
                navigate("/admin/companies")
            } else {
                toast.error(data.message || "Update failed.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) return <p>Loading company data...</p>;
    if (!company) return <p>Company not found.</p>;

    return (
        <div className="w-full p-5 custom-shadow rounded-xl">
           <div className="px-5">
           <button className="btn btn-primary" onClick={()=>navigate(-1)}>Back</button>
           </div>
            <h1 className="text-3xl font-medium p-5">Company Setup</h1>
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row flex-wrap">
                {[
                    { label: "Company Name", name: "name", type: "text" },
                    { label: "Company Website", name: "website", type: "url" },
                    { label: "Company Location", name: "location", type: "text" },
                ].map(({ label, name, type }) => (
                    <fieldset className="fieldset lg:w-1/2 w-full px-5" key={name}>
                        <legend className="fieldset-legend">{label}</legend>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="input input-primary w-full"
                            placeholder={`Enter ${label.toLowerCase()}`}
                        />
                    </fieldset>
                ))}

                <fieldset className="fieldset lg:w-1/2 w-full px-5">
                    <legend className="fieldset-legend">Upload Company Logo</legend>
                    <input
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="file-input file-input-primary w-full"
                        name="logo"
                    />
                </fieldset>

                <fieldset className="fieldset w-full px-5">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-primary w-full resize-none"
                        rows={4}
                    />
                </fieldset>

                <div className="p-5">
                    <button className="btn btn-primary" disabled={loading}>
                        {loading ? "Please wait..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SetupCompany;
