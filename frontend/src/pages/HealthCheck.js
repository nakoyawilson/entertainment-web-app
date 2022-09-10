import { useEffect, useState } from "react";

const HealthCheck = () => {
  const [health, setHealth] = useState(null);
  useEffect(() => {
    const healthCheck = async () => {
      const response = await fetch("/healthcheck");
      const json = await response.json();
      setHealth(json);
    };
    healthCheck();
  }, []);

  return <div>{health && health.message}</div>;
};

export default HealthCheck;
