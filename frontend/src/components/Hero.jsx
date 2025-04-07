import React from 'react';
import { FaSearch } from 'react-icons/fa'; // To add a search icon

const Hero = () => {
    return (
        <section className="bg-white py-16" >
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="md:text-4xl text-2xl font-bold mb-4 text-gray-800">Find Your Dream Job</h2>
                <p className="md:text-xl text-lg  mb-8">Search jobs, view recommendations, and apply directly through our portal.</p>

                {/* Search Bar */}
                <div className="relative mx-auto max-w-lg">
                    <input
                        type="text"
                        placeholder="Search for jobs..."
                        className="w-full py-3 px-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <FaSearch className="text-gray-500" />
                    </div>
                </div>
            </div>
        </section >

    );
};

export default Hero;
