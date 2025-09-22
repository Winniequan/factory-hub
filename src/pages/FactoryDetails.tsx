import React from "react";
import { useParams } from "react-router-dom";
import factoriesData from "../data/factories.json";


const FactoryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const factory = factoriesData.find((f) => f.id === id);

  if (!factory) {
    return <div className="p-6 text-center text-red-500">Factory not found</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">{factory.name}</h1>
      <p className="text-gray-500 mb-4">
        Established: {factory.established_year} · {factory.location.city},{" "}
        {factory.location.province}, {factory.location.country}
      </p>

      {/* Introduction */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p>{factory.introduction}</p>
      </div>

      {/* Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {factory.media.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${factory.name} image ${idx + 1}`}
            className="rounded-xl shadow-md"
          />
        ))}
      </div>
      <div className="mb-6">
        {factory.media.videos.map((video, idx) => (
          <video
            key={idx}
            src={video}
            controls
            className="w-full rounded-xl shadow-md mb-4"
          />
        ))}
      </div>

      {/* Products */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <ul className="space-y-3">
          {factory.products.map((product, idx) => (
            <li key={idx} className="border p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-sm mt-2">
                MOQ: {product.min_order_quantity} · Lead Time:{" "}
                {product.lead_time_days} days
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Certifications</h2>
        <ul className="list-disc list-inside">
          {factory.certifications.map((cert, idx) => (
            <li key={idx}>{cert}</li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <p>📞 {factory.contact.phone}</p>
        <p>📧 {factory.contact.email}</p>
        <p>💬 WeChat: {factory.contact.wechat}</p>
        <p>
          🌐{" "}
          <a
            href={factory.contact.website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            {factory.contact.website}
          </a>
        </p>
      </div>
    </div>
  );
};

export default FactoryDetails;
