// src/pages/ServiceDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiceById } from "../lib/api";
import { QuoteForm } from "../components/QuoteForm";

export function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceData = await getServiceById(id);
        setService(serviceData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
          <p className="text-gray-600 mb-6">{service.description}</p>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Get a Quote for {service.name}</h2>
            <QuoteForm initialService={service.name} />
          </div>
        </div>
      </div>
    </div>
  );
}