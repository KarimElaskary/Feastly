import React from "react";

const ContactUs = () => {
  return (
    <div className="py-20 px-4 md:px-0 relative overflow-hidden">
      {/* Background Blobs (if parent doesn't provide them, harmless to add here) */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-3xl relative">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-500 text-lg">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-slate-700 ml-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="input"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 ml-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-slate-700 ml-1"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="input resize-none"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
