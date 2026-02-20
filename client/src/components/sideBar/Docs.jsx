import React from "react";

const Docs = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-12">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-3">
          CloudShare Documentation
        </h1>
        <p className="text-gray-400 text-lg">
          CloudShare is a scalable cloud file storage platform designed for
          secure uploads, public/private sharing, and developer integration.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Overview</h2>
        <p className="text-gray-400">
          CloudShare allows users to upload, manage, search, and securely share
          files using bucket-based cloud storage. The platform supports large
          file handling, access control, API integration, and future SaaS
          subscription plans.
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Secure cloud-based storage</li>
          <li>Public & private file access</li>
          <li>Instant shareable links</li>
          <li>Search and file management tools</li>
          <li>API & SDK support for developers</li>
        </ul>
      </section>

      {/* Core Concepts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Core Concepts</h2>

        <div>
          <h3 className="text-lg font-semibold text-white">Buckets</h3>
          <p className="text-gray-400">
            Buckets are logical containers that organize files in cloud storage.
            Each file is stored inside a bucket. Future updates will allow
            custom bucket creation and management.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Files</h3>
          <p className="text-gray-400">
            Files include metadata such as name, type, size, upload date, and
            access level. Files can be downloaded, shared, or deleted at any time.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Access Control</h3>
          <p className="text-gray-400">
            Files can be marked as:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li><strong>Private:</strong> Only accessible by the owner</li>
            <li><strong>Public:</strong> Generates a shareable public link</li>
          </ul>
          <p className="text-gray-400 mt-2">
            Upcoming features include expiring links and signed URLs.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Storage Quotas</h3>
          <p className="text-gray-400">
            Each account has a storage limit depending on the plan. Uploading
            files consumes available storage space.
          </p>
        </div>
      </section>

      {/* Dashboard Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Using the Dashboard</h2>

        <div>
          <h3 className="text-lg font-semibold text-white">Uploading Files</h3>
          <p className="text-gray-400">
            Navigate to “My Files” and click the Upload button. Select a file
            or drag and drop. Files are instantly stored in the cloud.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Managing Files</h3>
          <p className="text-gray-400">
            Use the table or mobile cards to toggle public/private access,
            copy public links, download, or delete files.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Search</h3>
          <p className="text-gray-400">
            Use the search bar to instantly filter files by name.
          </p>
        </div>
      </section>

      {/* API Access */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">API Access</h2>

        <p className="text-gray-400">
          CloudShare provides secure API endpoints for uploading, retrieving,
          and managing files programmatically.
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
          <pre>
{`POST /api/file/upload-url
POST /api/file/metadata
GET  /api/file/download/:fileId
PATCH /api/file/toggle-access/:fileId
DELETE /api/file/:fileId`}
          </pre>
        </div>

        <p className="text-gray-400">
          API keys can be generated in the API Keys section of the dashboard.
        </p>
      </section>

      {/* Developer SDK */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Developer SDK (Coming Soon)</h2>

        <p className="text-gray-400">
          CloudShare will provide an official npm package that allows developers
          to integrate file storage directly into their applications.
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
          <pre>
{`npm install cloudshare-sdk

import { uploadFile } from "cloudshare-sdk"

await uploadFile(file, {
  apiKey: "YOUR_API_KEY",
  isPublic: true
})`}
          </pre>
        </div>
      </section>

      {/* Plans & Storage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Plans & Storage</h2>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-3">
          <p className="text-gray-300">
            <strong>Free Plan:</strong> 400 MB storage
          </p>
          <p className="text-gray-300">
            <strong>File Count:</strong> Unlimited files (within storage limit)
          </p>
          <p className="text-gray-400 text-sm">
            Example: If each file is 0.5 MB, you can store approximately 800 files.
          </p>
        </div>
      </section>

      
      {/* Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Security</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Secure cloud storage infrastructure</li>
          <li>Access-controlled file visibility</li>
          <li>Authenticated API requests</li>
          <li>Encrypted file transfers</li>
        </ul>
      </section>

      {/* Roadmap */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Roadmap</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>Paid subscription tiers</li>
          <li>Custom bucket management</li>
          <li>Expiring public links</li>
          <li>Role-based access control</li>
          <li>Official npm SDK release</li>
        </ul>
      </section>

    </div>
  );
};

export default Docs;
