import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy bg-gray-50 text-gray-800 p-6 md:p-12 leading-relaxed">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">
          This policy was last updated on <strong>28th July 2025</strong>.
        </p>

        {/* Intro */}
        <p className="mb-4">
          This is the privacy policy ("policy") for <strong>SpringerNatureLink</strong> 
          which is run and provided by Springer Nature Limited (we, us and our). 
          Springer Nature Limited is located at The Campus, 4 Crinan Street, London N1 9XW. 
          We can also be contacted at{" "}
          <a
            href="https://support.nature.com/en/support/home"
            className="text-blue-600 underline"
          >
            https://support.nature.com/en/support/home
          </a>.
        </p>

        <p className="mb-6">
          We will only use the personal data gathered over this website as set out in this
          policy. Below you will find information on how we use your personal data, for which
          purposes your personal data is used, with whom it is shared and what control and
          information rights you may have.
        </p>

        {/* Sections */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          I. Summary of our processing activities
        </h2>
        <p className="mb-4">
          We publish scholarly journals, books, news and data. Some of this material is freely
          available; some of it is only available to subscribers. The following summary offers
          a quick overview of the data processing activities that are undertaken on our website.
          You will find more detailed information under the indicated sections below.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            When you visit our website for informational reasons without setting up an account,
            only limited personal data will be processed to provide you with the website itself.
          </li>
          <li>
            If you are identified as belonging to a customer organisation then we collect
            information in order to provide usage reporting.
          </li>
          <li>
            In case you register for one of our services, use submission/peer review systems or
            subscribe to newsletters, further personal data will be processed.
          </li>
          <li>
            Your personal data may also be used for advertising, analytics, and improving your
            experience with third-party content.
          </li>
          <li>
            Personal data may be disclosed to third parties, possibly outside your country of
            residence.
          </li>
          <li>
            You may have rights under applicable legislation regarding your data.
          </li>
        </ul>

        {/* Example for additional sections */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">II. Definitions</h2>
        <p className="mb-4">
          <strong>Personal data:</strong> any information relating to a natural person who can
          be identified, directly or indirectly.
        </p>
        <p className="mb-6">
          <strong>Processing:</strong> any operation performed on personal data, such as
          collection, storage, adaptation, or disclosure.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-300 my-10"></div>

        {/* Footer */}
        <p className="text-sm text-gray-600">
          Should you have any questions regarding our privacy policy, please contact us via the
          email:{" "}
          <a
            href="mailto:dataprotection@springer.com"
            className="text-blue-600 underline"
          >
            dataprotection@springer.com
          </a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
