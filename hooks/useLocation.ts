import { locations } from "constant";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState<string>();

  useEffect(() => {
    ///get location
    fetch("https://www.cloudflare.com/cdn-cgi/trace")
      .then((response) => response.text())
      .then((two) => {
        let data = two.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
        data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
        var userLocation = JSON.parse(data).loc?.toLowerCase();
        const defaultLocale =
          locations.find((country) => country.code === userLocation) ||
          locations[0];
        setLocation(defaultLocale.value);
      });
  }, []);

  return { location };
};

export default useLocation;
